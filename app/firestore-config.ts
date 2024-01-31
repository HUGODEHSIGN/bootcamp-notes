// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB6MHrGmTyk0AiwDfaLEOWzXKYfUYsgrBk",
  authDomain: "full-stack-bootcamp-notes.firebaseapp.com",
  projectId: "full-stack-bootcamp-notes",
  storageBucket: "full-stack-bootcamp-notes.appspot.com",
  messagingSenderId: "856414069083",
  appId: "1:856414069083:web:1c1ab69a73b0c06385ba7e",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);
