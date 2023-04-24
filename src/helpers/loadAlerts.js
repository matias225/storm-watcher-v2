import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";

// Este helper carga la colleccion completa de alertas desde la base de datos.
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