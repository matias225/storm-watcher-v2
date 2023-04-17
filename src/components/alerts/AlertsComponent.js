import React from 'react';
import { NavBar } from '../NavBar';
import { AlertComponent } from './AlertComponent';

export const AlertsComponent = () => {
  
  const alerts = [1, 2, 3, 4, 5];
  
  return (
    <>
      <NavBar /> 
      <div className='alert__main'>
        <h1>
          Alertas
        </h1>
        {
          alerts.map( value => (
            <AlertComponent key={value} />
          ))
        }
      </div>

    </>
  )
}
