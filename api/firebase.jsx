// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC3Earnh-bMfvjGsoPj6SMfB0CNuedZ01E",
  authDomain: "quiz-6601d.firebaseapp.com",
  projectId: "quiz-6601d",
  storageBucket: "quiz-6601d.appspot.com",
  messagingSenderId: "77119311419",
  appId: "1:77119311419:web:9a59645a9545de8071161e",
  measurementId: "G-FQNSFZF811",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
