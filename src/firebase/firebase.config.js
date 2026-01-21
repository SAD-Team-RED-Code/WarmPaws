// src/firebase/firebase.config.js

import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth"; // <-- Add this import

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDixgBJSDiB0T-2vu-x9DzLOuBW37Que2E",
  authDomain: "warmpaws-9ce52.firebaseapp.com",
  projectId: "warmpaws-9ce52",
  storageBucket: "warmpaws-9ce52.firebasestorage.app",
  messagingSenderId: "584059492715",
  appId: "1:584059492715:web:84c2c4720ab3735374542e",
  measurementId: "G-501HB3JKKS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Initialize Auth and export it
export const auth = getAuth(app); // <-- Export auth

// Optional: export app and analytics if needed elsewhere
export { app, analytics };