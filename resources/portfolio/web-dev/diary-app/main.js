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

// * Months, formatDateForEntry(), addZero(), emailValid()
// * Added to namespace from js/utils.js in index.html

//TODO MAKE VAR FOR GLOBAL VARS

const firebaseConfig = {
 // ? Config here
}
const app = initializeApp(firebaseConfig);
const auth = getAuth();

const inputElms =  [...grab('.login-element > input', "all")]

function switchToSignup(){

// * LogIn
    grab("login-container").style.display = "block"
    resetLoginInputs()

// * SignIn
    grab("signin-container").style.display = "none"

// * SignUp
    grab("signup-container").style.display = "flex"

// * Content
    grab("content-container").style.display = "none"
    grab("entries-content-container").style.display = "none"
    grab("new-entry-container").style.display = "none"
    
    //TODO Remove data from session in observer
}

function switchToSignin(){

// * LogIn
    grab("login-container").style.display = "block"
    resetLoginInputs()

// * SignIn
    grab("signin-container").style.display = "flex"

// * SignUp
    grab("signup-container").style.display = "none"

// * Content
    grab("content-container").style.display = "none"
    grab("entries-content-container").style.display = "none"
    grab("new-entry-container").style.display = "none"
    
    //TODO Remove data from session in observer
}

function switchToShowEntries(){
// * LogIn
    grab("login-container").style.display = "none"
    resetLoginInputs()

// * SignIn
    grab("signin-container").style.display = "none"

// * SignUp
    grab("signup-container").style.display = "none"

// * Content
    grab("content-container").style.display = "flex"
    grab("entries-content-container").style.display = "flex"
    grab("new-entry-container").style.display = "none"
}

function switchToAddEntry(){
// * LogIn
    grab("login-container").style.display = "none"
    resetLoginInputs()

// * SignIn
    grab("signin-container").style.display = "none"

// * SignUp
    grab("signup-container").style.display = "none"

// * Content
    grab("content-container").style.display = "flex"
    grab("entries-content-container").style.display = "none"
    grab("new-entry-container").style.display = "flex"
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

function addEventListenersToElements(){

// ? Login inputs
    resetLoginInputs()

// ? Signin buttons
    grab("signin-button").addEventListener("click", signInUser)
    grab("signup-redirect-button").addEventListener("click", switchToSignup)

// ? Signup buttons
    grab("signup-button").addEventListener("click", createAndSignInUser)
    grab("signin-redirect-button").addEventListener("click", switchToSignin)

// ? Content buttons
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
        // * Show content!
        // * Hide signin
        console.log(user)
        switchToShowEntries()
    }
    else {
        console.log("hide content and show signin")
        // * Hide content!
        // * Show signin
        switchToSignin()

        // ? lets say someone logs in on an account at a library, how to make the logout button remove the data from lets say the cookies
    }
})
addEventListenersToElements()

