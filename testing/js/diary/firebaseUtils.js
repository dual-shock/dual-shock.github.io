import { 
    initializeApp 
} from "https://www.gstatic.com/firebasejs/10.2.0/firebase-app.js";

import { 
    getFirestore, 
    collection, 
    getDocs, 
    setDoc, 
    orderBy, 
    doc, 
    query 
} from "https://www.gstatic.com/firebasejs/10.2.0/firebase-firestore.js";

import { 
    getAuth, 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword, 
    onAuthStateChanged 
} from "https://www.gstatic.com/firebasejs/10.2.0/firebase-auth.js"

export {
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
}
