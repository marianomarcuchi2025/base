// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBDxRTdgRsVeuvsdeaeqUU2XD31EhM8KMM",
  authDomain: "uber-militar.firebaseapp.com",
  projectId: "uber-militar",
  storageBucket: "uber-militar.firebasestorage.app",
  messagingSenderId: "592330471995",
  appId: "1:592330471995:web:faa9a0109fd870644e7a1e",
  measurementId: "G-NW11J0GHLD"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
