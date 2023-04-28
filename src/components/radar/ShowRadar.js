import { onMessage } from 'firebase/messaging';
import React, { useEffect, useState } from 'react';
import { messaging } from '../../firebase/firebaseConfig';
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

export const ShowRadar = () => {
  
  const [showSur, setShowSur ] = useState(true);

  // Para mostrar las notifiaciones por consola
  useEffect(()=>{
    onMessage(messaging, (message) => {
      const { title, body } = message.notification;
      // console.log("Tu Notificacion: ", title);
      // console.log('El cuerpo es: ', body);
      toast.info(
        <div>
          <h3>{title}</h3>
          <p>{body}</p>
        </div>, { 
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
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
      <ToastContainer />
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
