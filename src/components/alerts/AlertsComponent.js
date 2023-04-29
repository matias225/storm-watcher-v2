import React from 'react';
import { NavBar } from '../ui/NavBar';
import { AlertComponent } from './AlertComponent';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

export const AlertsComponent = () => {
  const { uid } = useSelector( state => state.auth );
  const { alerts } = useSelector( state => state.alerts );
  const { isAdmin } = useSelector( state => state.admin );  

  // Se pide permiso cada vez que entra al componente
  Notification.requestPermission().then((permision) => {
    if (permision === 'granted') {
      // console.log('Notification granted');
    } else {
      console.log('Unable to get permission');
    }
  });

  // Si no esta logueado redirecciono al login y si actualizo tambien.
  if (!uid || isAdmin === null) {
    return <Navigate to="/" replace />;
  } 

  return (
    <>
      <NavBar /> 
      <div className='alert__main'>
        <h1 className='alert__main-title'>
          Alertas
        </h1>
        {
          alerts.map( (alert, index) => (
            <AlertComponent 
              key={ alert.id }
              { ...alert }
            />
          ))
        }
      </div>
    </>
  )
}
