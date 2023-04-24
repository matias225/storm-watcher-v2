import React from 'react';
import { startLogout } from '../actions/auth';
import { useDispatch, useSelector } from 'react-redux';

import { NavLink } from 'react-router-dom';

export const NavBar = () => {
  const { name } = useSelector( state => state.auth );
  const { isAdmin } = useSelector( state => state.auth );

  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch( startLogout() );
  };

  return (
    <>
      <div className='navbar__main'>
          <ul className='navbar__links'>
            <li><NavLink to='/'>Radar</NavLink></li>
            <li><NavLink to='/alerts'>Alertas</NavLink></li>
            {
              isAdmin &&
              <li><NavLink to='/newalert'>Nueva Alerta</NavLink></li>
            }
          </ul>

          <div className='navbar__user'>
            <ul className='navbar__links'>
              <li className='navbar__title'>
                {name}
              </li>
              <li>
                <button className='navbar__button'
                  onClick={ handleLogout } 
                >
                  Logout
                </button>
              </li>
            </ul>  
          </div>
      </div>
    </>
  )
}
