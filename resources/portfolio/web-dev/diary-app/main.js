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
}
from "./js/firebaseUtils.js"

// * Months, formatDateForEntry(), addZero(), emailValid()
// * Added to namespace from js/utils.js in index.html

//TODO MAKE VAR FOR GLOBAL VARS

const firebaseConfig = {
    // ? Config Here    
}
const app = initializeApp(firebaseConfig);
const auth = getAuth();

function addEventListenersToElements(){
    // ? Signin buttons
    grab("signin-button").addEventListener("click", signInUser)

}
function signInUser(){
    //TODO Make html inputs into like email inputs and use all the attributes from the mdn docs 
    
    let emailInput      = grab("signin-email-input").value
    let passwordInput   = grab("signin-password-input").value

    let errorsList = []

    if(!emailValid(emailInput)){        errorsList.push("Invalid Email.") }
    if(passwordInput == undefined){     errorsList.push("Password cannot be empty.") }
    if(!passwordInput.length > 1000){   errorsList.push("Your passowrd does not need to be that long. cmon.") }

    if(!errorsList.length > 0){
        signInWithEmailAndPassword(auth, emailInput, passwordInput)
        .then((userCredential) => { 
            // ? Throws to signin-state observer
        })
        .catch((error) => { 
            errorsList.push(error.code.split("/")[1].replaceAll("-"," ")) 
        });   
    }

    if(errorsList.length > 0){
        grab("signin-error").style.display = "block" 
        grab("signin-error").innerHTML = ""
        errorsList.forEach((error) => { grab("signin-error").innerHTML += `# ${error} <br>` } ) 
    }  
}
function createAndSignInUser(emailInput, passwordInput, confirmPasswordInput){

    //TODO Check validity, throw errors

    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
        // ? Throws to observer
    })
    .catch((error) => {
        let errorMessage = error.code.split("/")[1].replaceAll("-"," ")
        // ! Handle error, retry CREATING
    });
}
function signOutUser(){
    signOut(auth).then(() => {
        // ? Throws to observer
    }).catch((error) => {
        let errorMessage = error.code.split("/")[1].replaceAll("-"," ")
        // ! Handle error, retry 
    });
}

onAuthStateChanged(auth, async (user) => {
    if (user) {
        console.log("show content and hide signin")
        // * Show content!
        // * Hide signin
        let userId = user.uid
    }
    else {
        console.log("hide content and show signin")
        // * Hide content!
        // * Show signin
    }
})
addEventListenersToElements()

