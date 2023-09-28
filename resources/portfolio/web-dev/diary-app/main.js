import {
    // * App
    initializeApp,

    // * Firestore
    getFirestore, collection, 
    getDocs, setDoc, doc,
    orderBy, query, 

    // * Auth
    getAuth, onAuthStateChanged, 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword, 
    signOut
}
from "./js/firebaseUtils.js"

// * formatDateForEntry(), addZero(), emailValid()
// * hide(), showFlex(), showBlock()
// * Added to namespace from js/utils.js in index.html

//TODO MAKE VAR FOR GLOBAL VARS

const firebaseConfig = {
    // ? Config here
}
const app = initializeApp(firebaseConfig);
const db = getFirestore(app)
const auth = getAuth();

const inputElms =  [...grab('.login-element > input', "all")]

const categories = {
    dream : {
        name : "dream",
        bgColor: "#c692cd"
    },
    diary : {
        name : "diary",
        bgColor: "#CDC392"
    },
    thought : {
        name : "thought",
        bgColor: "#bbcd92"
    },
}

const months = [ 
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December" 
]


function switchToSignup(){

// * LogIn
    showBlock("login-container")

// * SignIn
    hide("signin-container")

// * SignUp
    showFlex("signup-container")

// * Content
    hide("content-container")
    hide("entries-content-container")
    hide("new-entry-container")
}

function switchToSignin(){

// * LogIn
    showBlock("login-container")

// * SignIn
    showFlex("signin-container")

// * SignUp
    hide("signup-container")

// * Content
    hide("content-container")
    hide("entries-content-container")
    hide("new-entry-container")
}

function switchToShowEntries(){

// * LogIn
    hide("login-container")
    
// * SignIn
    hide("signin-container")

// * SignUp
    hide("signup-container")

// * Content
    showFlex("content-container")
    showFlex("entries-content-container")
    hide("new-entry-container")
    loadEntries()
}

function switchToAddEntry(){

// * LogIn
    hide("login-container")
    
// * SignIn
    hide("signin-container")

// * SignUp
    hide("signup-container")

// * Content
    resetAddEntryInputs()
    showFlex("content-container")
    hide("entries-content-container")
    showFlex("new-entry-container")
}



function resetLoginInputs(){

    grab("signin-email-input").value = ""
    grab("signin-password-input").value = ""
    grab("signup-email-input").value = ""
    grab("signup-password-input").value = ""
    grab("signup-confirm-password-input").value = ""
    inputElms.forEach((inputElm) => {
        inputElm.classList.remove("login-input-clicked")
        inputElm.addEventListener("click", e => { e.target.classList.add("login-input-clicked") }, {once: true})
    })    
}

function resetAddEntryInputs(){
    //TODO 
}
function switchCategory(category){
    console.log(category)
}

async function loadEntries(query){
    console.log("load data with query")
}

function addEventListenersToElements(){

// ? Signin buttons
    grab("signin-button").addEventListener("click", signInUser)
    grab("signup-redirect-button").addEventListener("click", switchToSignup)

// ? Signup buttons
    grab("signup-button").addEventListener("click", createAndSignInUser)
    grab("signin-redirect-button").addEventListener("click", switchToSignin)

// ? Content buttons
    grab("dream-selector-button").addEventListener("click", () => switchCategory(categories.dream))
    grab("diary-selector-button").addEventListener("click", () => switchCategory(categories.diary))
    grab("thought-selector-button").addEventListener("click", () => switchCategory(categories.thought))

    grab("logout-button").addEventListener("click", signOutUser)
    grab("add-entry-button").addEventListener("click", switchToAddEntry)

    grab("cancel-entry-button").addEventListener("click", switchToShowEntries)

    

}



async function signInUser(){
    
    let emailInput      = grab("signin-email-input").value
    let passwordInput   = grab("signin-password-input").value

    let errorsList = []

    if(!emailValid(emailInput)){        errorsList.push("Email invalid.") }
    if(emailInput == ""){               errorsList.push("Email cannot be empty.") }
    if(passwordInput == ""){            errorsList.push("Password cannot be empty.") }
    if(!passwordInput.length > 1000){   errorsList.push("Your passowrd does not need to be that long. cmon.") }

    if(errorsList.length == 0){
        await signInWithEmailAndPassword(auth, emailInput, passwordInput)
        .then((userCredential) => { 
            // ? Throws to signin-state observer
        })
        .catch((error) => { 
            errorsList.push(`Server: ${error.code.split("/")[1].replaceAll("-"," ")} `) 
        });   
    }
    
    if(errorsList.length > 0){
        grab("signin-error").style.display = "block" 
        grab("signin-error").innerHTML = ""
        errorsList.forEach((error) => { grab("signin-error").innerHTML += `# ${error} <br>` } ) 
    }  
}

async function createAndSignInUser(){

    //TODO Add email verification

    let emailInput              = grab("signup-email-input").value
    let passwordInput           = grab("signup-password-input").value
    let confirmPasswordInput    = grab("signup-confirm-password-input").value

    let errorsList = []

    if(!emailValid(emailInput)){                errorsList.push("Email invalid.") }
    if(emailInput == ""){                       errorsList.push("Email cannot be empty.") }
    if(passwordInput == ""){                    errorsList.push("Password cannot be empty.") }
    if(passwordInput != confirmPasswordInput){  errorsList.push("Passwords do not match.") }
    if(!passwordInput.length > 1000){           errorsList.push("Your password does not need to be that long. cmon.") }

    if(errorsList.length == 0){
        await createUserWithEmailAndPassword(auth, emailInput, confirmPasswordInput)
        .then((userCredential) => {
            // ? Throws to observer
        })
        .catch((error) => {
            errorsList.push(`Server: ${error.code.split("/")[1].replaceAll("-"," ")} `) 
        });        
    }

    if(errorsList.length > 0){
        grab("signup-error").style.display = "block" 
        grab("signup-error").innerHTML = ""
        errorsList.forEach((error) => { grab("signin-error").innerHTML += `# ${error} <br>` } ) 
    }
}

function signOutUser(){
    signOut(auth).then(() => {
        // ? Throws to observer
    }).catch((error) => {
        let errorMessage = error.code.split("/")[1].replaceAll("-"," ")
        console.log(errorMessage)
        // ! Handle error, retry 
    });
}



// * Page load!

onAuthStateChanged(auth, async (user) => {
    if (user) {
        console.log("show content and hide signin")
        console.log(user.uid)

        var querySnapshot = await getDocs(query(collection(db, `users/${user.uid}/entries`)))

        // TODO PLAN
        
        // Add querysnapshot listener


        console.log(querySnapshot.docs)
    
        console.log( doc(db, `users/${user.uid}/entries`, "9999999999"))

        console.log(querySnapshot.docs)

        switchToShowEntries()
    }
    else {
        console.log("hide content and show signin")

        //TODO Remove data from session in observer
        resetLoginInputs()
        switchToSignin()

        // ? lets say someone logs in on an account at a library, how to make the logout button remove the data from lets say the cookies
    }
})

addEventListenersToElements()

