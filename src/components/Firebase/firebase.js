import firebase from "firebase";
import "firebase/firestore";

const config = {
  apiKey: "AIzaSyCZfsNseGlkh8aeY5qzyhU3FX4kaVbho4w",
  authDomain: "reservations-7dd65.firebaseapp.com",
  databaseURL: "https://reservations-7dd65.firebaseio.com",
  projectId: "reservations-7dd65",
  storageBucket: "reservations-7dd65.appspot.com",
  messagingSenderId: "700946145822",
  appId: "1:700946145822:web:0d1ae82a04d87e135e440f",
  measurementId: "G-X0FK3CRX19"
};

const fire = firebase.initializeApp(config);
let db = firebase.firestore();
export default db;
