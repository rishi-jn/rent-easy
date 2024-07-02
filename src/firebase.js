import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth/web-extension";
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASEKEY,
  authDomain: "rent-easy-3b97b.firebaseapp.com",
  projectId: "rent-easy-3b97b",
  storageBucket: "rent-easy-3b97b.appspot.com",
  messagingSenderId: "916980655642",
  appId: "1:916980655642:web:74ad46a6bd006d59db13a3"
};
console.log(process.env.REACT_APP_FIREBASEKEY);
const app = initializeApp(firebaseConfig);

export const auth=getAuth(app);
export const provider=new GoogleAuthProvider();
export const db=getFirestore();