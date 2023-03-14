import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from 'firebase/auth'
import {getFirestore} from 'firebase/firestore'
import {getStorage} from 'firebase/storage'

const firebaseConfig = {
  apiKey: "AIzaSyBFxsRRREj1qicQ5DQaYUYQ8bJ3z3XFCZc",
  authDomain: "fir-with-react-1888c.firebaseapp.com",
  projectId: "fir-with-react-1888c",
  storageBucket: "fir-with-react-1888c.appspot.com",
  messagingSenderId: "402772877922",
  appId: "1:402772877922:web:fdb42c707dd099a4a9a73b",
  measurementId: "G-07MWKZXG0H"
};


const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const googleProvider = new GoogleAuthProvider()
export const db = getFirestore(app)
export const storage = getStorage(app)
