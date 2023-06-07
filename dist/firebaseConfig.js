"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.storage = void 0;
// Import the functions you need from the SDKs you need
const app_1 = require("firebase/app");
const storage_1 = require("firebase/storage");
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
const app = (0, app_1.initializeApp)(firebaseConfig);
exports.storage = (0, storage_1.getStorage)(app);
