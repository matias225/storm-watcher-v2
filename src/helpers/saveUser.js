import { doc, setDoc } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";

// Este helper guarda un usuario en la base de datos
export const saveUser = (user) => {
  const newUser = { ...user }
  delete newUser.uid;
  setDoc(doc(db, `users/${user.uid}`), newUser);
}