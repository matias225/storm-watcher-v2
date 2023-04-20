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
        alerts: [ ...state.alerts, action.payload ]
      }

    case types.alertsLoad:
      return {
        ...state,
        alerts: [ ...action.payload]
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