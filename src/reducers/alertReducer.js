import { types } from "../types/types";

const initialState = {
  alerts: [],
  active: null,
}

export const alertReducer = (state = initialState, action) => {
  
  switch (action.type) {
    
    case types.alertActive:
      return {
        ...state,
        active: {
          ...action.payload
        }
      }

    case types.alertsAddNew:
      return {
        ...state,
        alerts: [ action.payload, ...state.alerts ]
      }

    case types.alertDelete:
      return {
        ...state,
        active: null,
        alerts: state.alerts.filter( 
          alert => alert.id !== action.payload
        )
      }

    case types.alertsLoad:
      return {
        ...state,
        alerts: [ ...action.payload]
      }

    case types.alertsUpdate:
      return {
        ...state,
        alerts: state.alerts.map(
          alert => alert.id === action.payload.id
            ? action.payload.alert
            : alert
        )
      }

    case types.alertsLogoutCleaning:
      return {
        ...state,
        active: null,
        alerts: []
      }
      
    default:
      return state;
  }
}