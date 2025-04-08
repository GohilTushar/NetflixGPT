// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBIFnaerG0fHq0CRQPzoK3s-M94VkY38pU",
  authDomain: "netflix-gpt-deb23.firebaseapp.com",
  projectId: "netflix-gpt-deb23",
  storageBucket: "netflix-gpt-deb23.firebasestorage.app",
  messagingSenderId: "83379031302",
  appId: "1:83379031302:web:4f5e32a82acf461fc8a287",
  measurementId: "G-67522KQK30"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth();
