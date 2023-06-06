import React, { useEffect, useState } from 'react'
import { NavBar } from '../ui/NavBar'
import { NavLink } from 'react-router-dom';
import { deleteOlderAlerts } from "../../helpers/deleteOlderAlerts";

export const AdminPanel = () => {

  const [hasLoaded, setHasLoaded] = useState(false);

  useEffect(() => {
    if (!hasLoaded) {
      deleteOlderAlerts();
      setHasLoaded(true);
    }
  }, [hasLoaded]);

  return (
    <>
      <NavBar/>
      <div>
        <ul className='admin__list'>
          <li><NavLink to='/newalert'>Crear nueva alerta</NavLink></li>
        </ul>
      </div>
    </>
  )
}
