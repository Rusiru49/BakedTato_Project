// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyChNaNSyWPaVaHvqcMFVM9cuSXwvykH9p0",
  authDomain: "itpproject-e931a.firebaseapp.com",
  projectId: "itpproject-e931a",
  storageBucket: "itpproject-e931a.firebasestorage.app",
  messagingSenderId: "951595850840",
  appId: "1:951595850840:web:f5e403cb6e174b2b627e2d",
  measurementId: "G-XW9MSY8G20"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const googleAuthProvider = new GoogleAuthProvider();
export const auth = getAuth();
