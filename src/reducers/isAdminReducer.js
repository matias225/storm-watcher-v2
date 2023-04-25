import { types } from "../types/types";

const initialState = {
  isAdmin: null
};

export const isAdminReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.updateUser:
      return {
        isAdmin: action.payload.isAdmin
      }
    case types.logout:
      return initialState;
    default:
      return state;
  }
};