import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from '../firebase/firebaseConfig';

// Este helper verifica si existe un token con ese uid
export const checkTokenInFirestore = async (uid) => {
  const q = query(collection(db, '/tokens'), where('uid','==', uid));
  const tokenById = [];

  const querySnap = await getDocs(q);
  querySnap.forEach((doc) => {
    const token = doc.data().token;
    if (token) {
      tokenById.push(token)
    } else {
      return;
    } 
  });
  console.log(tokenById)
  return tokenById;
}
// Funciona, trae token segun el uid
// Debo mirar bien si no existe un token, crearlo, pero desde donde llame a este helper