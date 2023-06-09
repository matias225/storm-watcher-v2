import React from 'react';
import { NavBar } from '../ui/NavBar';
import { AlertComponent } from './AlertComponent';
import { useSelector } from 'react-redux';
import { Navigate, useNavigate } from 'react-router-dom';

export const AlertsComponent = () => {
  const { uid } = useSelector( state => state.auth );
  const { alerts } = useSelector( state => state.alerts );
  const { isAdmin } = useSelector( state => state.admin );  
  const navigate = useNavigate();

  // Se pide permiso cada vez que entra al componente
  if (Notification.permission === 'granted') {
    console.log('User already granted permission');
  } else if (Notification.permission === 'denied') {
  } else {
    console.log('User denied permission');
    Notification.requestPermission().then((permision) => {
      if (permision === 'granted') {
        console.log('Notification granted');
      } else {
        console.log('Unable to get permission');
      }
    });
  }

  // Si no esta logueado redirecciono al login y si actualizo tambien.
  if (!uid || isAdmin === null) {
    return <Navigate to="/" replace />;
  } 

  const handleBackClick = (e) => {
    e.preventDefault();
    navigate('/radar');
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
      <div className='alert__button'>
          <button
            onClick={handleBackClick}
            className='btn btn-primary' 
          > 
            Volver
          </button>
        </div>
    </>
  )
}
