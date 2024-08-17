import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyBSr4T-PSkeq3T0zKgYIfJhtd3-ati6iwk",
    authDomain: "biblioteca-app-8c8ed.firebaseapp.com",
    projectId: "biblioteca-app-8c8ed",
    storageBucket: "biblioteca-app-8c8ed.appspot.com",
    messagingSenderId: "350305780069",
    appId: "1:350305780069:web:d257908662207d1756618c",
    measurementId: "G-G1Q9Z9N8S5"
  };
  
  initializeApp(firebaseConfig);

  export const auth = getAuth();
  export const db = getFirestore();
  
  