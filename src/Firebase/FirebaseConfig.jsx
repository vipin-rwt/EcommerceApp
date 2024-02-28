// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore';
import {getAuth} from 'firebase/auth';
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCXKqYzKZ-ARsONGW89dnapIPXmEEEzBz8",
  authDomain: "ecomm-8ac68.firebaseapp.com",
  projectId: "ecomm-8ac68",
  storageBucket: "ecomm-8ac68.appspot.com",
  messagingSenderId: "648788475194",
  appId: "1:648788475194:web:f0af85b3e5d60c7f736403"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const FireDB=getFirestore(app);
const auth=getAuth(app);
export { auth , FireDB };