// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB5Z2jFGoaahcA9dBYDkjVl9HURMLzNWbw",
  authDomain: "mini-linkedin-3515f.firebaseapp.com",
  projectId: "mini-linkedin-3515f",
  storageBucket: "mini-linkedin-3515f.firebasestorage.app",
  messagingSenderId: "864111271820",
  appId: "1:864111271820:web:f772310244d14e074180a9",
  measurementId: "G-72PYJZ0F4P",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);

export default app;
