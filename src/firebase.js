// Import the functions you need from the SDKs you need
// src/firebase/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBbvpAV6PuzYZ2vjm4lykiBXUPY4sQ0Mgw",
  authDomain: "expense-tracker-891b5.firebaseapp.com",
  projectId: "expense-tracker-891b5",
  storageBucket: "expense-tracker-891b5.firebasestorage.app",
  messagingSenderId: "582396427634",
  appId: "1:582396427634:web:f807a388b0878c778f31eb",
  measurementId: "G-6PLQPFYWXS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const googleProvider = new GoogleAuthProvider();
const analytics = getAnalytics(app);

export { auth, db, googleProvider, analytics };
