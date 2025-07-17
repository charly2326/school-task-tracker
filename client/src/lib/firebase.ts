// src/lib/firebase.ts

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBUHZK-5B6t_nCiNLU7KO3aX6yu1Wn2WEE",
  authDomain: "school-youni.firebaseapp.com",
  projectId: "school-youni",
  storageBucket: "school-youni.firebasestorage.app",
  messagingSenderId: "288320831466",
  appId: "1:288320831466:web:f254e1b78a1344d4f73c93",
  measurementId: "G-LC1G15KJY8",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);

