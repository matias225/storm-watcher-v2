import { messaging } from "../firebase/firebaseConfig";
import { getToken } from 'firebase/messaging';

// Tiene que hacerse solo una vez  
const vapidKey = "BCyMqPTtAhyjNyGgSpt9UukjKrjRPnNCvBw9VcCfP_oFdyDEXRj9a-kADm5AF6sPbBXsB1TIBN_rQOvlU4s3rls";
  
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