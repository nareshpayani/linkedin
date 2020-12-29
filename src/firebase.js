// For Firebase JS SDK v7.20.0 and later, measurementId is optional

import firebase from "firebase";

const firebaseConfig = {
    apiKey: "AIzaSyC2lq37_84VSBSrqWWaD4SjvOIql8nlOKs",
    authDomain: "linkedin-54624.firebaseapp.com",
    projectId: "linkedin-54624",
    storageBucket: "linkedin-54624.appspot.com",
    messagingSenderId: "85004710531",
    appId: "1:85004710531:web:1a4eb440cf6d300aa861b6",
    measurementId: "G-Y4GL35ZH8C"
  };

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();

const auth = new firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider()

export default db;
export {auth, provider};