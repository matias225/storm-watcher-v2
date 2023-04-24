import { doc, setDoc } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";
import { v4 as uuidv4 } from 'uuid';
import { loadAlerts } from '../helpers/loadAlerts';
import { types } from '../types/types';
import { finishLoading, startLoading } from "./ui";

export const startNewAlert = (title, body) => {
  return async ( dispatch ) => {
    dispatch( startLoading() );
    const alertId = uuidv4();
    const newAlert = {
      title: title,
      body: body,
      date: new Date().getTime()
    }
    await setDoc(doc(db,`/alerts/${ alertId }`), newAlert);
    dispatch( activeAlert( alertId, newAlert ) );
    dispatch( addNewAlert( alertId, newAlert ) );
    dispatch( finishLoading() );
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