// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBAPrtPFW22s5iZeYHCW-cT9RLcLaLvBRI",
  authDomain: "blog-react-3747b.firebaseapp.com",
  databaseURL: "https://blog-react-3747b-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "blog-react-3747b",
  storageBucket: "blog-react-3747b.appspot.com",
  messagingSenderId: "690010824047",
  appId: "1:690010824047:web:bbcd2a3b4de2949cae5c9a"
};

// Initialize Firebase
const fire = initializeApp(firebaseConfig);

export default fire;