import React, { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase/firebaseConfig';
import { login } from '../actions/auth';
import { LoginScreen } from '../components/auth/LoginScreen';
import { RegisterScreen } from '../components/auth/RegisterScreen';
import { AuthRouter } from './AuthRouter';
import { HomePage } from '../components/HomePage';
import { AlertsComponent } from '../components/alerts/AlertsComponent';
import { startLoadingAlerts } from '../actions/alerts';
import { NewAlertComponent } from '../components/alerts/NewAlertComponent';

export const AppRouter = () => {

  const dispatch = useDispatch();

  const [ checking, setChecking ] = useState(true);
  const [ isLoggedIn, setIsLoggedIn ] = useState(false);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if ( user?.uid ) {
        dispatch( login( user.uid, user.displayName ) );
        setIsLoggedIn(true);
        dispatch( startLoadingAlerts() );
      } else {
        setIsLoggedIn(false);
      }
      setChecking(false);
    });
  }, [dispatch, setChecking, setIsLoggedIn]);

  if (checking) {
    return  (
      <h1>Espere...</h1>
    )
  }
  
  return (
    <Routes>
      <Route element={<AuthRouter isAuthenticated={isLoggedIn}/> }>
        <Route path='/' element={ <HomePage /> } />
      </Route>
      <Route path={'/alerts'} element={ <AlertsComponent /> } />
      <Route path={'/newalert'} element={ <NewAlertComponent /> } />
      <Route path={'/login'} element={ <LoginScreen /> } />
      <Route path={'/register'} element={ <RegisterScreen /> } />
      <Route path='*' element={ <LoginScreen /> } />
      
    </Routes>
  )
}
