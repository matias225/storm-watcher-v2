import React from 'react';
import { NavBar } from '../ui/NavBar';
import { AlertComponent } from './AlertComponent';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { checkTokenInFirestore } from '../../helpers/checkTokenInFirestore';

export const AlertsComponent = () => {
  const { uid } = useSelector( state => state.auth );
  const { alerts } = useSelector( state => state.alerts );
  const { isAdmin } = useSelector( state => state.admin );  

  // Se pide permiso cada vez que entra al componente
  Notification.requestPermission().then((permision) => {
    if (permision === 'granted') {
      console.log('Notification granted');

      // Me fijo con el uid si tiene token en la bd
      // Tengo que guardar el token una vez obtenido si no lo tenia
      checkTokenInFirestore(uid)
        .then((tokenById) => {
          if (!tokenById) {
            console.log('Token not found');
          } else {
            console.log('tokenById: ', JSON.stringify(tokenById[0]));
          }
      });
      
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
