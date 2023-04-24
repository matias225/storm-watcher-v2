import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";

// Este helper hace la consulta a la bd de usuarios, devuelve true si el usuario existe o false si no.
export const getUser = async (uid) => {
  const user = await getDoc(doc(db, `users/${uid}`));
  if (user.exists()) {
    return true;
  } else {
    // console.log('Usuario no encontrado');
    return false;
  }
}

export const getUserRole = async (uid) => {
  const user = await getDoc(doc(db, `users/${uid}`));
  const rol = user.data().isAdmin;
  return rol;
}