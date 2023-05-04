// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getMessaging } from "firebase/messaging";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  // vapidKey: process.env.REACT_APP_FIREBASE_VAPID_KEY
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);
// Initialize Google Auth Provider and get a reference to the service
const googleAuthProvider = new GoogleAuthProvider();
const auth = getAuth();
// Initialize Firebase Cloud Messaging and get a reference to the service
const messaging = getMessaging(app);

// const vapidKey = firebaseConfig.vapidKey;

export {
  app, 
  db, 
  googleAuthProvider,
  auth, 
  messaging,
};