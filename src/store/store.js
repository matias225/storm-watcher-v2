import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import { authReducer } from '../reducers/authReducer';
import { uiReducer } from '../reducers/uiReducer';
import { alertReducer } from '../reducers/alertReducer';
import { isAdminReducer } from '../reducers/isAdminReducer';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const reducers = combineReducers({
  auth: authReducer,
  ui: uiReducer,
  alerts: alertReducer,
  admin: isAdminReducer
});

export const store = createStore(
  reducers,
  composeEnhancers(
    applyMiddleware( thunk )
  )
);