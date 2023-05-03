import { addDoc, collection } from "firebase/firestore";
import { db } from '../firebase/firebaseConfig';

// Este helper junta todos los tokens de la collecction tokens en un array
export const saveTokenInFirestore = (uid, token) => {
  const tokensRef = collection(db, 'tokens');
  const newToken = {
    token: token,
    uid: uid
  };
  addDoc(tokensRef, newToken);
}
// Funciona pero graba siempre el mismo token, dependiendo del dispositivo y el navegador
// Pero al menos los guarda en distintos usuarios