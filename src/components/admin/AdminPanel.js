import React, { useEffect, useState } from 'react';
import { NavBar } from '../ui/NavBar';
import { NavLink, useNavigate } from 'react-router-dom';
import { deleteOlderAlerts } from "../../helpers/deleteOlderAlerts";

export const AdminPanel = () => {

  const [hasLoaded, setHasLoaded] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!hasLoaded) {
      deleteOlderAlerts();
      setHasLoaded(true);
    }
  }, [hasLoaded]);

  const handleBackClick = (e) => {
    e.preventDefault();
    navigate('/radar');
  }

  return (
    <>
      <NavBar/>
      <div>
        <ul className='admin__list'>
          <li><NavLink to='/newalert'>Crear nueva alerta</NavLink></li>
        </ul>
        <div className='alert__button'>
          <button
            onClick={handleBackClick}
            className='btn btn-primary' 
          > 
            Volver
          </button>
        </div>
      </div>
    </>
  )
}
