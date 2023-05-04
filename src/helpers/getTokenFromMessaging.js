import { messaging } from "../firebase/firebaseConfig";
import { getToken } from 'firebase/messaging';

// Tiene que hacerse solo una vez  
const vapidKey = "BPol32Vnpkwgs5Y66o6OGvbitbrtbT7YbKz00TYSJHaE43N26HlBlHPKaDwWeegsL_8M54E4Ybt7wHyZ67MjjKM";
  
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