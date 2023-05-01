import { collection, getDocs } from "firebase/firestore";
import { db } from '../firebase/firebaseConfig';

// Este helper junta todos los tokens de la collecction tokens en un array
export const getTokensFromFirestore = async () => {
  const querySnap = await getDocs(collection(db, '/tokens'));
  const tokens = [];

  // Obtener array de tokens
  querySnap.forEach( (doc) => {
    const token = doc.data().token
    tokens.push(token);
  });
  return tokens;
}
