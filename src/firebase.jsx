import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// import "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA5k2tSs-QnRQ9wzetXhRKNPxtL_i7Txs0",
  authDomain: "chat-8908f.firebaseapp.com",
  projectId: "chat-8908f",
  storageBucket: "chat-8908f.appspot.com",
  messagingSenderId: "800400272557",
  appId: "1:800400272557:web:5b17d443a532d2f7332a24"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore();
