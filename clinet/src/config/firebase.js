import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth } from "firebase/auth";
import { Form } from "react-router";

const firebaseConfig = {
  apiKey: "AIzaSyBPaCHFv0OtmP3hQeKc_xXz0zAHcJ5WKdU",
  authDomain: "test-1-8a134.firebaseapp.com",
  projectId: "test-1-8a134",
  storageBucket: "test-1-8a134.firebasestorage.app",
  messagingSenderId: "110061201400",
  appId: "1:110061201400:web:c3c2cfc35f2dbc929fd80d",
  measurementId: "G-W3T5814BZ1",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleAuthProvider = new GoogleAuthProvider();
