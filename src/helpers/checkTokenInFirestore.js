import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from '../firebase/firebaseConfig';

// Este helper verifica si existe un token con ese uid, si no existe devuleve undefined
export const checkTokenInFirestore = async (uid) => {
  const q = query(collection(db, '/tokens'), where('uid','==', uid));
  const tokenById = [];

  const querySnap = await getDocs(q);
  if(querySnap.empty) {
    return;
  }
  querySnap.forEach((doc) => {
    const token = doc.data().token;
    if (token) {
      tokenById.push(token)
    }
  });
  return tokenById;
}
// Funciona, trae token segun el uid