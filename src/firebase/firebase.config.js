import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDixgBJSDiB0T-2vu-x9DzLOuBW37QueE",
  authDomain: "warmpaws-9ce52.firebaseapp.com",
  projectId: "warmpaws-9ce52",
  storageBucket: "warmpaws-9ce52.firebasestorage.app",
  messagingSenderId: "584059492715",
  appId: "1:584059492715:web:84c2c4720ab3735374542e",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);