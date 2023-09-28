import {
    initializeApp,     
    getFirestore, 
    collection, 
    getDocs, 
    setDoc, 
    orderBy, 
    doc, 
    query, 
    getAuth, 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword, 
    onAuthStateChanged 
} from "./firebaseUtils.js"

const firebaseConfig = {
    // ? Config Here
}
const app = initializeApp(firebaseConfig);
const auth = getAuth();
let db, sortQuery, querySnapshot, 
    yearMonthPairs, exampleTimestamp, allEntries
let selectedCategory = "diary"

onAuthStateChanged(auth, async (user) => {
  if (user) {
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/auth.user
    console.log(user.uid)
    console.log("load data now")

    await loadContent(user.uid)

  } 
  else {
    // User is signed out
    

  }
})




grab("sign-in-button").addEventListener("click", e => {
    let valid = true
    let errors = []
    if(!emailValid(grab("email-input-input").value)){
        valid = false
        errors.append("email invalid")
    }
    if(grab("pass-input-input").value == ""){
        valid = false
        errors.append("password cant be empty")
    }
    if(valid){
        signInWithEmailAndPassword(auth, grab("email-input-input").value, grab("pass-input-input").value)
            .then((userCredential) => {
                let user = userCredential.user;
                grab("error-output").style.display = "none"
                grab("error-output").innerHTML = ""
                //Throws to observer
            })
            .catch((error) => {
                let errorCode = error.code;
                let errorMessage = error.message;
                valid = false
                errors.append(errorCode.split("/")[1].replaceAll("-"," "))
            });        
    }
    if(!valid){
        grab("error-output").style.display = "flex"
        grab("error-output").innerHTML = errors[0].charAt(0).toUpperCase() + errors[0].slice(1)

        for (let i = 1; i < errors.length-2; i++){
            grab("error-output").innerHTML += `, ${errors[i]}`      
        }
        grab("error-output").innerHTML += errors[-1] + "."
    }
})



grab("newuser-button").addEventListener("click", e => {
    if(e.target.dataset.registering == "true"){
        let valid = true
        let errors = []
        if(!emailValid(grab("email-input-input").value)){
            valid = false
            errors.append("email invalid")
        }
        if(grab("confirm-pass-input-input").value != grab("pass-input-input").value){
            valid = false
            errors.append("passwords not matching")
        }
        if(grab("pass-input-input").value == ""){
            valid = false
            errors.append("password cant be empty")
        }
        if(valid){ 
            createUserWithEmailAndPassword(auth, grab("email-input-input").value, grab("confirm-pass-input-input").value)
                .then((userCredential) => {
                    console.log(userCredential.user)
                    e.target.dataset.registering = "false"
                    e.target.innerText = "New user?"
                    grab("confirm-pass-input").style.display = "none"
                    grab("signin-input").style.display = "flex"
                    grab("error-output").style.display = "none"
                    grab("error-output").innerHTML = ""
                    //Throws to observer
                })
                .catch((error) => {
                    let errorCode = error.code;
                    let errorMessage = error.message;
                    console.log(errorCode.split("/")[1].replaceAll("-"," "))
                    grab("error-output").style.display = "flex"
                    grab("error-button").innerHTML += errorCode.split("/")[1].replaceAll("-"," ")
                    errors.append(errorCode.split("/")[1].replaceAll("-"," "))
                    valid = false
                });
        }
        if(!valid){
            grab("error-output").style.display = "flex"
            grab("error-output").innerHTML = errors[0].charAt(0).toUpperCase() + errors[0].slice(1)

            for (let i = 1; i < errors.length-2; i++){
                grab("error-output").innerHTML += `, ${errors[i]}`      
            }
            grab("error-output").innerHTML += errors[-1] + "."
        }


    }
    if(e.target.dataset.registering == "false"){
        grab("signin-input").style.display = "none"
        grab("confirm-pass-input").style.display = "flex"
        e.target.innerText = "Register"
        e.target.dataset.registering = "true"
    }
})
grab("sign-out-link").addEventListener("click", e => {
    signOut(auth).then(() => {
        //throws to observer
    }).catch((error) => {
        //handle error
    });
})

async function loadContent(userId){
    grab("pre-sign-in").style.display = "none"
    grab("main").style.display = "block"

    db = getFirestore(app)
    sortQuery = query(collection(db, `users/${userId}/entries`), orderBy("date", "desc"))
    querySnapshot = await getDocs(sortQuery)

    // querySnapshot = await getDocs(query(collection(db, `users/${userId}/entries`), orderBy("date", "desc")))

    yearMonthPairs = []
    exampleTimestamp = querySnapshot.docs[0].data().date
    
    for (let i = 0; i < document.getElementsByClassName("cat-selector").length; i++) {
        document.getElementsByClassName("cat-selector")[i].addEventListener("click", e => {
            changeCategory(selectedCategory, e.target.dataset.category)})}


    allEntries = addAllEntries(selectedCategory)
    createSidebar()
    addAddbar(userId)
}
function unLoadContent(){
    grab("pre-sign-in").style.display = "flex"
    grab("main").style.display = "none"

    grab("sidebar").innerHTML = ""
    grab("entries").innerHTML = ""

    querySnapshot = undefined
    yearMonthPairs = undefined
    exampleTimestamp = undefined
    allEntries = undefined
    sortQuery = undefined
}


function snapshotEntryElm(snapData, currentCategory){
    let entryElm = document.createElement("div")
    let docDate = new Date(snapData.date.seconds * 1000)
    entryElm.classList.add("entry")
    entryElm.dataset.category = snapData.category
    entryElm.dataset.year = docDate.getFullYear()
    entryElm.dataset.month = months[docDate.getMonth()].substring(0, 3) 
    
    entryElm.innerHTML = `
        <div class="entry-info">
        <div class="entry-date">${formatDateForEntry(snapData.date.seconds)}</div>
        <div class="entry-words">${snapData.content.split(" ").length} words</div>
        </div>
        <div class="entry-content">
        ${snapData.content}
        </div>`
    if(snapData.category != currentCategory){
        entryElm.style.display = "none"
    }
    let year = `${docDate.getFullYear()}`
    if(!yearMonthPairs.includes(year)){
        yearMonthPairs.push(year)
    }
    let yearMonthPair = `${docDate.getFullYear()}_${docDate.getMonth()}`
    if(!yearMonthPairs.includes(yearMonthPair)){
        yearMonthPairs.push(yearMonthPair)
    }
    return entryElm
}
function addAllEntries(currentCategory){
    querySnapshot.forEach((doc) => {
        snapshotEntryElm(doc.data())
        grab("entries").append(snapshotEntryElm(doc.data(), currentCategory))
    })
    return [...grab(".entry", "all")]
}
function createSidebar(){
    let sidebarElm = grab("sidebar")
    sidebarElm.innerHTML = ""
    yearMonthPairs.forEach((pair) => {
        if(pair.length == 4){
            let yearElm = document.createElement("div")
            yearElm.classList.add("sidebar-year")
            yearElm.innerText = pair
            sidebarElm.append(yearElm) 
        }
        else{
            let monthElm = document.createElement("div")
            monthElm.classList.add("sidebar-month")
            monthElm.innerText = months[parseInt(pair.split("_")[1])].substring(0, 3)
            monthElm.dataset.year = pair.split("_")[0]
            monthElm.dataset.month = months[parseInt(pair.split("_")[1])].substring(0, 3)
            monthElm.addEventListener("click", e => {timeframeEntries(e.target.dataset.year, e.target.dataset.month)})
            sidebarElm.append(monthElm)    
        }
    })
    document.body.addEventListener("click", e => {if(!e.target.matches(".sidebar-month")){unTimeframeEntries()}})
}
function unTimeframeEntries(){
    allEntries.filter(entry => entry.dataset.category == selectedCategory).forEach((elm =>{elm.style.display = "block"}))
}
function timeframeEntries(year, month){
    unTimeframeEntries()
    allEntries.filter(entry => entry.dataset.category == selectedCategory).forEach((elm =>{
        if(elm.dataset.year != year || elm.dataset.month != month){
            elm.style.display = "none"
        }
        
    }))
}
function changeCategory(currentCategory, newCategory){
    if(newCategory!=currentCategory){
        

        if(newCategory == "diary"){
            document.body.style.backgroundColor = "#CDC392"
        }
        if(newCategory == "dream"){
            document.body.style.backgroundColor = "#c692cd"
        }
        if(newCategory == "thought"){
            document.body.style.backgroundColor = "#bbcd92"
        }
         
        allEntries.filter(entry => entry.dataset.category == currentCategory).forEach((elm =>{
            elm.style.display = "none"
        }))
        allEntries.filter(entry => entry.dataset.category == newCategory).forEach((elm =>{
            elm.style.display = "block"
        }))
    }
    selectedCategory = newCategory
    grab("submit-entry").innerText = `Add ${selectedCategory} entry`
    //TODO highlight category changers
}
function addAddbar(userId){
    let currTime = new Date()
    grab("add-bar").style.display = "block"
    grab("add-bar").addEventListener("click", e => {
        grab("content").style.display = "none"
        grab("add-bar").style.display = "none"
        grab("add-input").style.display = "block"
        grab("submit-entry").innerText = `Add ${selectedCategory} entry`
        grab("time-input").value =
        `${currTime.getFullYear()}-${addZero(currTime.getMonth()+1)}-${addZero(currTime.getDate())}T${addZero(currTime.getHours())}:${addZero(currTime.getMinutes())}`
    })  
    grab("cancel").addEventListener("click", e =>{
        grab("content").style.display = "block"
        grab("add-bar").style.display = "block"
        grab("add-input").style.display = "none"
    })
    grab("submit-entry").addEventListener("click", e =>{

        let newDocId = `${currTime.getDate()}${addZero(currTime.getMonth()+1)}${currTime.getFullYear().toString().substring(2,4)}${addZero(currTime.getHours())}${addZero(currTime.getMinutes())}`
        //TODO Add warning, only 1 document per minute


        let newDocTimestamp = exampleTimestamp
        newDocTimestamp.seconds = Math.round(currTime.getTime()/1000)
        newDocTimestamp.nanoseconds = Math.round(((currTime.getTime() / 1000) % 1) * 100000000)
        
        let newDocObj = {
            content: grab("text-input").value,
            category: selectedCategory, 
            date: newDocTimestamp
        } 

        try {
            let docRef = setDoc(doc(db, `users/${userId}/entries`, newDocId), newDocObj);
        } 
        catch (e) {
            console.error("Error adding document: ", e);
        }

        let newestElm = snapshotEntryElm(newDocObj, selectedCategory)
        grab("entries").prepend(newestElm)
        allEntries.unshift(newestElm)

        grab("content").style.display = "block"
        grab("add-bar").style.display = "block"
        grab("add-input").style.display = "none"
        grab("text-input").value = ""
    })
    grab("load-draft").addEventListener("click", e =>{
        //TODO add draft functionality
        console.log("draft functionality to be added!")
        //dim whole screen, add selector on top of everything in list
        //list can be similar to entry list, show date, first few words

        //pull from document collection "drafts"
    })
    grab("add-draft").addEventListener("click", e =>{
        //TODO add draft functionality
        console.log("draft functionality to be added!")

        //push to document collection "drafts"
    })
}