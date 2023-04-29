import React, { useState } from 'react';
import { startLogout } from '../../actions/auth';
import { useDispatch, useSelector } from 'react-redux';

import { NavLink } from 'react-router-dom';

export const NavBar = () => {
  const { name } = useSelector( state => state.auth );
  const { isAdmin } = useSelector( state => state.admin );
  // const isAdmin = localStorage.getItem("isAdmin");
  const [ isOpen, setIsOpen ] = useState(false);

  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch( startLogout() );
  };

  const handleToggle = () => {
    setIsOpen(!isOpen);
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

        <div 
          className={
            isOpen ? 
              'navbar__dropdown-menu open' :
              'navbar__dropdown-menu'
        }>
          <hr/><li><NavLink to='/'>Radar</NavLink></li>
          <hr/><li><NavLink to='/alerts'>Alertas</NavLink></li>
          <hr/>{
            isAdmin &&
            <li><NavLink to='/newalert'>Nueva Alerta</NavLink></li>
          }
        </div>

        <div className='navbar__user'>
          <div className='navbar__toogle-btn'>
            <i className="fa-solid fa-bars" onClick={ handleToggle }/>
          </div>
          <ul className='navbar__links name'>
            <li className='navbar__title'>
              {name}
            </li>
            <li>
              <button className='navbar__button navbar__title'
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
