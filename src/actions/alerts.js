import { addDoc, collection, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";
// import { v4 as uuidv4 } from 'uuid';
import { loadAlerts } from '../helpers/loadAlerts';
import { types } from '../types/types';
import { uiFinishSubmitting, uiStartSubmitting } from "./ui";
import Swal from "sweetalert2";

export const startNewAlert = (title, body) => {
  return async ( dispatch ) => {
    dispatch( uiStartSubmitting() );
    const alertRef = collection(db, 'alerts');
    // const alertId = uuidv4();
    // const alertId = new Date().getTime();

    const newAlert = {
      title: title,
      body: body,
      date: new Date().getTime()
    };
    const docRef = await addDoc(alertRef, newAlert);
    const alertId = docRef.id;

    // await setDoc(doc(db,`/alerts/${ alertId }`), newAlert);
    dispatch( addNewAlert( alertId, newAlert ) );
    dispatch( uiFinishSubmitting() );
  }
}

export const activeAlert = (id, alert) => ({
  type: types.alertActive,
  payload: {
    id,
    ...alert
  }
});

export const addNewAlert = (id, alert) => ({
  type: types.alertsAddNew,
  payload: {
    id,
    ...alert
  }
});

export const startLoadingAlerts = ( uid ) => {
  return async ( dispatch ) => {
    const alerts = await loadAlerts( uid );
    dispatch( setAlerts(alerts) );
  }
}

export const setAlerts = ( alerts ) => ({
  type: types.alertsLoad,
  payload: alerts
});

export const alertLogout = () => ({
  type: types.alertsLogoutCleaning,
});

export const startDeleting = ( id ) => {
  return async ( dispatch ) => {
    const AlertId = id;
    await deleteDoc(doc(db,`/alerts/${ AlertId }`));
    dispatch( deleteAlert(AlertId) );
  }
}

export const deleteAlert = ( id ) => ({
  type: types.alertDelete,
  payload: id
});

// Actualizar alerta en Firestore
export const startSaveAlert = ( alert ) => {
  return async ( dispatch ) => {
    const alertToFirestore = { ...alert };
    delete alertToFirestore.id;

    await updateDoc(doc(db, `/alerts/${ alert.id }`), alertToFirestore);
    dispatch( refreshAlert( alert.id, alertToFirestore) );
    Swal.fire('Saved', alert.title, 'success');
  }
}

// Actualizar alertas en la lista
export const refreshAlert = ( id, alert ) => ({
  type: types.alertsUpdate,
  payload: {
    id, 
    alert: {
      id,
      ...alert
    }
  }
});