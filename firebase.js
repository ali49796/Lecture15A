import { initializeApp, getApp, getApps } from "firebase/app";
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyAqNlBWETLMw_OdV9kMItYbBAiALbNFhQ4",
  authDomain: "crud-80c45.firebaseapp.com",
  projectId: "crud-80c45",
  storageBucket: "crud-80c45.appspot.com",
  messagingSenderId: "638882286577",
  appId: "1:638882286577:web:02077e259d2dad3088d250"
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore();

export { app, db }