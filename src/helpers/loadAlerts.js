import { collection, getDocs } from "firebase/firestore"
import { db } from "../firebase/firebaseConfig"

export const loadAlerts = async ( ) => {
  const querySnap = await getDocs(collection(db, 'alerts'));
  const alerts = [];

    querySnap.forEach( (doc) => {
      alerts.push({
        id: doc.id,
        ...doc.data()
      });
    })
  return alerts;
}