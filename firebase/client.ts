// Import the functions you need from the SDKs you need
import { initializeApp,getApp,getApps } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCK-mdqgzUv6sfCOyeftxA-Q5n28VnNQ2o",
  authDomain: "prepup-789ec.firebaseapp.com",
  projectId: "prepup-789ec",
  storageBucket: "prepup-789ec.firebasestorage.app",
  messagingSenderId: "522247253951",
  appId: "1:522247253951:web:e53ba552bcb3df51b37b0a",
  measurementId: "G-6332G6TCBF"
};

// Initialize Firebase
const app = !getApps.length ?initializeApp(firebaseConfig):getApp();


export const auth = getAuth(app);
export const db = getFirestore(app);

// const analytics = getAnalytics(app);