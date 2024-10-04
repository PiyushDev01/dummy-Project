
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { getFirestore } from "firebase/firestore"; 

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA0WHeVDebNrBeM8mt06dBV-9Bco3AQKr4",
  authDomain: "dummy-2a211.firebaseapp.com",
  projectId: "dummy-2a211",
  storageBucket: "dummy-2a211.appspot.com",
  messagingSenderId: "448679837011",
  appId: "1:448679837011:web:6474a2224f3f04349535a6",
  databaseURL: "https://dummy-2a211-default-rtdb.firebaseio.com"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Set up Firebase Authentication
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);