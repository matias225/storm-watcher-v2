import React, { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase/firebaseConfig';
import { login } from '../actions/auth';
import { LoginScreen } from '../components/auth/LoginScreen';
import { RegisterScreen } from '../components/auth/RegisterScreen';
import { AuthRouter } from './AuthRouter';
import { HomePage } from '../components/ui/HomePage';
import { AlertsComponent } from '../components/alerts/AlertsComponent';
import { startLoadingAlerts } from '../actions/alerts';
import { NewAlertComponent } from '../components/alerts/NewAlertComponent';
import { LoadingScreen } from '../components/auth/LoadingScreen';
import AdminPanel from '../components/admin/AdminPanel';

export const AppRouter = () => {

  const dispatch = useDispatch();
  const { loading } = useSelector( store => store.ui );

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
      if ( !loading ) {
        setChecking(false);
      }
    });
  }, [dispatch, setChecking, setIsLoggedIn, loading]);

  if (checking || loading) {
    return  (
      <LoadingScreen />
    )
  }
  
  return (
    <Routes>
      <Route element={<AuthRouter isAuthenticated={isLoggedIn}/> }>
        <Route path='/' element={ <HomePage /> } />
      </Route>
      <Route path={'/alerts'} element={ <AlertsComponent /> } />
      <Route path={'/newalert'} element={ <NewAlertComponent /> } />
      <Route path={'/adminpanel'} element={ <AdminPanel /> } />
      <Route path={'/login'} element={ <LoginScreen /> } />
      <Route path={'/register'} element={ <RegisterScreen /> } />
      <Route path='*' element={ <LoginScreen /> } />
      
    </Routes>
  )
}
