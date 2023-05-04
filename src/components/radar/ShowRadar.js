import React, { useEffect, useState } from 'react';
import { onMessage } from 'firebase/messaging';
import { auth, messaging } from '../../firebase/firebaseConfig';
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

import { onAuthStateChanged } from 'firebase/auth';
import { processToken } from '../../helpers/processToken';

export const ShowRadar = () => {
  const [ active, setActive ] = useState(true);

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

  onAuthStateChanged(auth, (user) => {
    if (user) {
      // El usuario ha iniciado sesión, obtenemos un nuevo token
      processToken(user.uid);
    }
  });

  const handleClick1 = () => {
    setActive(true);
  }

  const handleClick2 = () => {
    setActive(false);
  }

  // Boton de prueba para guardar obtener y guardar tokens
  // const handleSaveToken = async () => {
  //   getTokenFromMessaging(uid);
  // }

  return (
    <div className='radar__main'>
      <h1 className='radar__title'>
        Imagenes de Radar
      </h1>
      <ToastContainer />
      <div className='radar__box'>
        <button 
          onClick={ handleClick1 } 
          className={
            active ?
            'btn btn-primary radar__button active' :
            'btn btn-primary radar__button'
          }
        >
          Oasis Sur
        </button>
        <button onClick={ handleClick2 }
          className={
            active ?
              'btn btn-primary radar__button' :
              'btn btn-primary radar__button active' 
          }
        >
          Animacion
        </button>
        <div className='radar__img'>
          {
            ( active ) ? 
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
      {/* <div>
        <button onClick={ handleSaveToken } className='btn btn-primary radar__button'>
          Get Token
        </button>
      </div> */}
    </div>
  )
}
