import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyC_AaAhBt0d-mAnQHYGFod39XlxdlJ38Bw",
  authDomain: "modz-mafia.firebaseapp.com",
  projectId: "modz-mafia",
  storageBucket: "modz-mafia.firebasestorage.app",
  messagingSenderId: "40949260451",
  appId: "1:40949260451:web:eb5843d1a955c0a3b11f16",
  measurementId: "G-Y27QJHJR97"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);
