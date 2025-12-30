// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";
import { GoogleAuthProvider,getAuth } from "firebase/auth";
import { Form } from "react-router";

// import { getAnalytics } from "firebase/analytics";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBPaCHFv0OtmP3hQeKc_xXz0zAHcJ5WKdU",
  authDomain: "test-1-8a134.firebaseapp.com",
  projectId: "test-1-8a134",
  storageBucket: "test-1-8a134.firebasestorage.app",
  messagingSenderId: "110061201400",
  appId: "1:110061201400:web:c3c2cfc35f2dbc929fd80d",
  measurementId: "G-W3T5814BZ1"
};

// Initialize Firebase
// const analytics = getAnalytics(app);

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleAuthProvider = new GoogleAuthProvider();
