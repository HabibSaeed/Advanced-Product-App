import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyDPZ_jbhdHSIgPXZdq8WthFgZFFpcjNrZw",
    authDomain: "productapp-56e28.firebaseapp.com",
    projectId: "productapp-56e28",
    storageBucket: "productapp-56e28.appspot.com",
    messagingSenderId: "539175466591",
    appId: "1:539175466591:web:f88a7e67e68f0d62868dea"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);

export { app, db, auth, storage };