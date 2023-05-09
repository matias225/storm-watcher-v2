import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";

// Este helper carga la colleccion completa de alertas desde la base de datos, ordenados por fecha.
export const loadAlerts = async ( ) => {
  const alertsRef = collection(db, 'alerts');
  const q = query(alertsRef, orderBy("date", "desc"));
  const querySnap = await getDocs(q);
  const alerts = [];

  querySnap.forEach( (doc) => {
    alerts.push({
      id: doc.id,
      ...doc.data()
    });
  })
  return alerts;
}