import { onMessage } from 'firebase/messaging';
import React, { useEffect, useState } from 'react';
import { messaging } from '../../firebase/firebaseConfig';

export const ShowRadar = () => {
  
  const [showSur, setShowSur ] = useState(true);

  // Para mostrar las notifiaciones por consola
  useEffect(()=>{
    onMessage(messaging, (message) => {
      console.log("Tu Notificacion:", message.notification.title);
      console.log(message.notification.body)
    })
  });

  const handleClick1 = () => {
    setShowSur(true);
  }

  const handleClick2 = () => {
    setShowSur(false);
  }

  return (
    <div className='radar__main'>
      <h1 className='radar__title'>
        Imagenes de Radar
      </h1>
      <div className='radar__box'>
        <button onClick={ handleClick1 } className='btn btn-primary radar__button'>
          Oasis Sur
        </button>
        <button onClick={ handleClick2 } className='btn btn-primary radar__button'>
          Animacion
        </button>
        <div className='radar__img'>
          {
            ( showSur ) ? 
              (
                <img 
                  src='https://www2.contingencias.mendoza.gov.ar/radar/sur.gif' 
                  alt='sur'
                />
              ) : (
                <img 
                  src='https://www2.contingencias.mendoza.gov.ar/radar/animacion.gif' 
                  alt='animation'
                />
            )
          }
        </div>
      </div>
    </div>
  )
}
