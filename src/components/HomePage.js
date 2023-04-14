import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { startLogout } from '../actions/auth';

export const HomePage = () => {
  const dispatch = useDispatch();
  const { name } = useSelector( state => state.auth );
  
  const handleLogout = () => {
    dispatch( startLogout() );
  };
  
  return (
    <>
      <h1>Bienvenido <span> { name }</span></h1>

        <button 
          onClick={ handleLogout } 
          >
          Logout
        </button>
    </>
  )
}
