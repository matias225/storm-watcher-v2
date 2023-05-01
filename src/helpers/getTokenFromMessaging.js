import { messaging } from "../firebase/firebaseConfig";
import { getToken } from 'firebase/messaging';
import { saveTokenInFirestore } from "./saveTokenInFirestore";

// Tiene que hacerse solo una vez  
const vapidKey = "BCyMqPTtAhyjNyGgSpt9UukjKrjRPnNCvBw9VcCfP_oFdyDEXRj9a-kADm5AF6sPbBXsB1TIBN_rQOvlU4s3rls";
  
export const getTokenFromMessaging = (uid) => {
  const tokenPromise = getToken(messaging, { vapidKey: vapidKey });
  tokenPromise.then((currentToken) => {
    if (currentToken) {
      console.log('FCM registration token: ', currentToken);
      saveTokenInFirestore(uid, currentToken);
    }
  });
}