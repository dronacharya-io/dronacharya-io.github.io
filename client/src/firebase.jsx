// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC4UG33mWTTp73Lxcc2ul6hmRxsL9Imq_8",
  authDomain: "quiz-e2aa1.firebaseapp.com",
  projectId: "quiz-e2aa1",
  storageBucket: "quiz-e2aa1.appspot.com",
  messagingSenderId: "52034191826",
  appId: "1:52034191826:web:8040e956160e19817dc80b",
  measurementId: "G-8C10SWMFBJ",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export default app;
