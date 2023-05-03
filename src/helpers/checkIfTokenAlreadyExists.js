import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from '../firebase/firebaseConfig';

export const checkIfTokenAlreadyExists = async (token) => {
  const q = query(collection(db, '/tokens'), where('token','==', token));

  const tokenSnapshot = await getDocs(q);
  if(tokenSnapshot.empty) {
    return false;
  }
  const docId = tokenSnapshot.docs[0].id;
  return docId;
};