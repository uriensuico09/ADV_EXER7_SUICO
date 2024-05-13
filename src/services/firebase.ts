// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// Attention Please add your firebase console config here
const firebaseConfig = {
  apiKey: "AIzaSyBLFF-atU-WvkwkpJLJgSHQXrXNgJuQXhI",
  authDomain: "adv2-login-form.firebaseapp.com",
  projectId: "adv2-login-form",
  storageBucket: "adv2-login-form.appspot.com",
  messagingSenderId: "75503590920",
  appId: "1:75503590920:web:3fd9a27c41607258b37bbd"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
