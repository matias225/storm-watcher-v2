import React from 'react';
import { NavBar } from '../NavBar';
import { AlertComponent } from './AlertComponent';
import { startNewAlert } from '../../actions/alerts';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

export const AlertsComponent = () => {
  const dispatch = useDispatch();
  const { uid } = useSelector( state => state.auth );
  const { alerts } = useSelector( state => state.alerts );

  if (!uid) {
    return <Navigate to="/" replace />;
  } 

  const handleAddNew = () => {
    dispatch( startNewAlert() );
  }

  return (
    <>
      <NavBar /> 
      <div className='alert__main'>
        <h1 className='alert__main-title'>
          Alertas
        </h1>
        {
          alerts.map( alert => (
            <AlertComponent 
              key={ alert.id }
              { ...alert }
            />
          ))
        }
        <div 
        onClick={ handleAddNew }
        >
          <p className='btn-primary mt-5'>New alert</p>
      </div>
      </div>
      
    </>
  )
}
