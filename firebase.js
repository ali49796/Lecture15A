import { initializeApp, getApp, getApps } from "firebase/app";
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyD9HC_U8QtVZM2C8svFs5yupPxDXwXXKJw",
  authDomain: "crud-20ef9.firebaseapp.com",
  projectId: "crud-20ef9",
  storageBucket: "crud-20ef9.appspot.com",
  messagingSenderId: "669205129291",
  appId: "1:669205129291:web:0d9b74b8ceb1926171c5ce"
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const database = getFirestore();

export {app, database }
