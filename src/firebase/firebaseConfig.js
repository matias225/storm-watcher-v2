// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getMessaging } from "firebase/messaging";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC4ippkkPWHIrZZmcrJAF7yaXZ5NLn2Nm0",
  authDomain: "stormapp-2ff78.firebaseapp.com",
  projectId: "stormapp-2ff78",
  storageBucket: "stormapp-2ff78.appspot.com",
  messagingSenderId: "828220165537",
  appId: "1:828220165537:web:84d68191d38e3edce50fe0",
  vapidKey: 'AAAAwNXEzaE:APA91bEqtdoyFJ3iQ-2P6v33DYg4dG4NC9tf5ENw-AbGWLc5lzFVCREaJj8Fb416RGbv-8BBJN-h-h6ZXNvQOyb4eyA0p8vEmyamZyTTsZmWYaYvtm2cu4UV5OfyQ7qdVKt39gnNpK6-'
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
  // vapidKey
};