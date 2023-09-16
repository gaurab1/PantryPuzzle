import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore"
// import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_apiKey,
  authDomain: "pantrypuzzle.firebaseapp.com",
  projectId: "pantrypuzzle",
  storageBucket: "pantrypuzzle.appspot.com",
  messagingSenderId: "807440651341",
  appId: "1:807440651341:web:13934d2c99336757cf3804",
  measurementId: "G-D9JBSQXYYG"
};

const app = initializeApp(firebaseConfig);
export const firestore = getFirestore(app)
// const analytics = getAnalytics(app);