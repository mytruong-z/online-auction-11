import { initializeApp, getApps, getApp } from "firebase/app";
import { getDatabase } from "firebase/database"

const config = {
    apiKey: "AIzaSyAZ38JwVWYArBDMdql_m6EnwLEuWP9j3xA",
    authDomain: "onlineauction11-b9887.firebaseapp.com",
    databaseURL: "https://onlineauction11-b9887-default-rtdb.firebaseio.com",
    projectId: "onlineauction11-b9887",
    storageBucket: "onlineauction11-b9887.appspot.com",
    messagingSenderId: "685107332385",
    appId: "1:685107332385:web:a40272876d5b7a31bb2a60",
    measurementId: "G-1JDTKBVTBL"
};
// if (!firebase.apps.length) {
//   firebase.initializeApp(config);
// }
export const firebaseApp = getApps().length === 0 ? initializeApp(config) : getApp();
export const db = getDatabase(firebaseApp)
