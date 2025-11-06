// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDVRCQyICAkaytfSmbClrWE2mILWYW1tuM",
  authDomain: "simple-notes-app-61df8.firebaseapp.com",
  projectId: "simple-notes-app-61df8",
  storageBucket: "simple-notes-app-61df8.firebasestorage.app",
  messagingSenderId: "1079142547484",
  appId: "1:1079142547484:web:72b02e9727a6f60c4b1fd9",
  measurementId: "G-57BZJL2YXG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
const analytics = getAnalytics(app);
export const auth = getAuth(app);