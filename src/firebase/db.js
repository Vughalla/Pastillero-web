import firebase from "firebase";
import 'firebase/firestore';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAr7-UX1u2SkhIo6ejax9dM8LM4uD7dsQk",
    authDomain: "pastilleroapp-d6f04.firebaseapp.com",
    databaseURL: "https://pastilleroapp-d6f04-default-rtdb.firebaseio.com",
    projectId: "pastilleroapp-d6f04",
    storageBucket: "pastilleroapp-d6f04.appspot.com",
    messagingSenderId: "399306872074",
    appId: "1:399306872074:web:9cb4245e969a5b99e6d6f3",
    measurementId: "G-GRMWKTN8CF"
};

// Initialize Firebase
export const db = firebase.initializeApp(firebaseConfig).firestore();
