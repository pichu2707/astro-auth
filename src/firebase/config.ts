// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDSb3g4D7YypjRMNAjhleZEIz5QeaJJcEo",
  authDomain: "astro-authentication-da413.firebaseapp.com",
  projectId: "astro-authentication-da413",
  storageBucket: "astro-authentication-da413.firebasestorage.app",
  messagingSenderId: "830951716837",
  appId: "1:830951716837:web:ce4e29361e41a3c6dbe10c",
  measurementId: "G-VXGKHSPDG9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
auth.languageCode = 'es';

export const firebase = {
  app,
  auth,
};