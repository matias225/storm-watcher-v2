import { collection, deleteDoc, getDocs, query, where } from "firebase/firestore";
import { db } from '../firebase/firebaseConfig';

// Este helper verifica si existe un token con ese uid, si no existe devuleve undefined
export const deleteOlderAlerts = async () => {
  
  // Fecha de hace 2 dias 
  const twoDaysAgo = Date.now() - (2 * 24 * 60 * 60 * 1000);
 
  console.log('Deleting older alerts');
  const q = query(collection(db, 'alerts'), where('date', '<=', twoDaysAgo));
  
  const querySnap = await getDocs(q);

  querySnap.forEach((doc) => {
    deleteDoc(doc.ref);
  });
}