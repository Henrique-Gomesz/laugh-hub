// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDveq9yp3YxaTW5IAOXfxwVVFuFCo2Vi2E",
  authDomain: "laugh-hub-102b1.firebaseapp.com",
  databaseURL: "https://laugh-hub-102b1-default-rtdb.firebaseio.com",
  projectId: "laugh-hub-102b1",
  storageBucket: "laugh-hub-102b1.appspot.com",
  messagingSenderId: "840113895667",
  appId: "1:840113895667:web:abdd9a19e6012514c15f86",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
