// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

import { FB_APIKEY } from "@env";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDqqS900eqPk-PHM62dngZRJ8_rhmwrMhU",
  authDomain: "today-69b6c.firebaseapp.com",
  projectId: "today-69b6c",
  storageBucket: "today-69b6c.appspot.com",
  messagingSenderId: "13807527482",
  appId: "1:13807527482:web:5bca612f8bb42203b93703",
  measurementId: "G-XR9NHBSW96",
};

export const app = initializeApp(firebaseConfig);
export const Auth = getAuth(app);

// Initialize Firebase
