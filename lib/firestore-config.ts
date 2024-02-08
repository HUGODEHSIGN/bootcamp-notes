// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB5jzm0_PxDohSZenS71u_M-CRdN0xM9Gk",
  authDomain: "bootcamp-notes.firebaseapp.com",
  projectId: "bootcamp-notes",
  storageBucket: "bootcamp-notes.appspot.com",
  messagingSenderId: "432975998377",
  appId: "1:432975998377:web:beed5eabe772afad2f28b8",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);
