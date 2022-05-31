// Import the functions you need from the SDKs you need
import { initializeApp , getApps, getApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore'
import {getStorage} from 'firebase/storage'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAMJq_ozVybqESNT8N-3DSw-OQI_Pem8BI",
    authDomain: "howddy1-300b5.firebaseapp.com",
    projectId: "howddy1-300b5",
    storageBucket: "howddy1-300b5.appspot.com",
    messagingSenderId: "1093782986255",
    appId: "1:1093782986255:web:76b369f9c2b33ee0238d7a"
  };

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) :getApp() ;
const db = getFirestore();
const storage =  getStorage();

export {app, db, storage};
