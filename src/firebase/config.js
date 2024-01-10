// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import {getFirestore} from 'firebase/firestore/lite'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBGP7iFpzsn7qEl8If3ltbcoDdXYfnJFAc",
  authDomain: "san-bife.firebaseapp.com",
  projectId: "san-bife",
  storageBucket: "san-bife.appspot.com",
  messagingSenderId: "444045512804",
  appId: "1:444045512804:web:bfc744f06568b9843e8f71"
};

// Initialize Firebase
const FirebaseApp = initializeApp(firebaseConfig);
export const FirebaseAuth = getAuth(FirebaseApp);
export const FirebaseDB = getFirestore(FirebaseApp);