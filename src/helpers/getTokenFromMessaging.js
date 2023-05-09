import { messaging } from "../firebase/firebaseConfig";
import { getToken } from 'firebase/messaging';

// Tiene que hacerse solo una vez  
const vapidKey = process.env.REACT_APP_PUBLIC_VAPID_KEY;
  
export const getTokenFromMessaging = async () => {
  const tokenPromise = getToken(messaging, { vapidKey: vapidKey });
  return tokenPromise.then((currentToken) => {
    if (currentToken) {
      console.log('FCM registration token: ', currentToken);
      return currentToken;
    }
  }).catch((error) => {
    console.log(error)
  });
}