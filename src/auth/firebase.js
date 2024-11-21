import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {getStorage} from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyAs6IiJIi9u727-i73sUROW520PPuPbBg4",
    authDomain: "booking-app-ccdde.firebaseapp.com",
    projectId: "booking-app-ccdde",
    storageBucket: "booking-app-ccdde.appspot.com",
    messagingSenderId: "1087017863067",
    appId: "1:1087017863067:web:2fc1b7debe8708d685033e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage =getStorage(app)

// Initialize Auth
export const auth = getAuth(app);


export default app;
