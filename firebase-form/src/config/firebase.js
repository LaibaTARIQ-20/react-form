import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA1k3EZ8K1TFCfBFx6gXeLGiTHL3s2suQY",
  authDomain: "react-form-9b3a9.firebaseapp.com",
  projectId: "react-form-9b3a9",
  storageBucket: "react-form-9b3a9.firebasestorage.app",
  messagingSenderId: "781424715360",
  appId: "1:781424715360:web:e3cf76d90576ba68924505",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

// Initialize Firestore (for storing user roles)
export const db = getFirestore(app);
export const storage = getStorage(app);
export default app;
