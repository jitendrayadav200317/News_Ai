import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth } from "firebase/auth";
import { Form } from "react-router";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleAuthProvider = new GoogleAuthProvider();

// const firebaseConfig = {
//   apiKey: "AIzaSyBPaCHFv0OtmP3hQeKc_xXz0zAHcJ5WKdU",
//   authDomain: "test-1-8a134.firebaseapp.com",
//   projectId: "test-1-8a134",
//   storageBucket: "test-1-8a134.firebasestorage.app",
//   messagingSenderId: "110061201400",
//   appId: "1:110061201400:web:c3c2cfc35f2dbc929fd80d",
//   measurementId: "G-W3T5814BZ1",
// };
