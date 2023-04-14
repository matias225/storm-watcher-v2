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
  vapidKey: "AAAAwNXEzaE:APA91bHUV8Z8WSKgv8UUrj684kSjlRTAAa8q0s9Bd1lLpkdBREgDoCpVF9Y-2VdVhomkX9HF7bnLXhNyB34TClQbG3lerTftJvAOk4cJV-VEnIqhbeZxmFPkvGppocbuWZjnOx6DA9b8"
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

export {
  app, 
  db, 
  googleAuthProvider,
  auth, 
  messaging
};