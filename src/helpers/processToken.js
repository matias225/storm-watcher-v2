import { getTokenFromMessaging } from './getTokenFromMessaging';
import { verifyTokenAndUid } from './verifyTokenAndUid';
import { checkIfTokenAlreadyExists } from './checkIfTokenAlreadyExists';
import { saveTokenInFirestore } from "./saveTokenInFirestore";

// Funcion que maneja el token con Firebase y Messaging
export const processToken = async (uid) => {
  const result = await verifyTokenAndUid(uid);
  if (result.tokenExists && result.userHasToken) {
    // Token exists in Firestore and user has a token, proceed with your logic
    console.log('Token found for that user: ', JSON.stringify(result.tokenFound));
    const tokenAlreadyExists = await checkIfTokenAlreadyExists(result.tokenFound);
    console.log('tokenAlreadyExists: ', tokenAlreadyExists);
    if (tokenAlreadyExists) {
      console.log('Token already exists');
    } else {
      const newToken = await getTokenFromMessaging();
      saveTokenInFirestore(uid, newToken);
      console.log('Use the new token:', newToken);  
    }
  } else {
    // Token does not exist in Firestore or user does not have a token, handle the error
    const newToken = await getTokenFromMessaging();
    saveTokenInFirestore(uid, newToken);
    console.log('Use the new token:', newToken);
  }
}