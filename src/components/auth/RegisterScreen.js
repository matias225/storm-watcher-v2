import React from 'react';
import { Link, Navigate } from 'react-router-dom';
import validator from 'validator';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from '../../hooks/useForm';
import { removeError, setError } from '../../actions/ui';
import { startRegisterWithEmailPasswordName } from '../../actions/auth';
import Swal from 'sweetalert2';

export const RegisterScreen = () => {

  const dispatch = useDispatch();
  const { msgError } = useSelector( state => state.ui );
  const { uid } = useSelector( state => state.auth );

  const [ formValues, handleInputChange ] = useForm({
      name: 'Matias',
      email: 'matias@gmail.com',
      password: '123456',
      password2: '123456',
  });
  
  const { name, email, password, password2 } = formValues;

  // Solucion al problema de que no redirigia cuando logueaba desde la pagina login
  // Verifico que ya esta logueado verificando si existe la uid que devuelve Firebase
  if (uid) {
    return <Navigate to="/" replace />;
  } 

  const handleRegister = (e) => {
    e.preventDefault();
    if ( isFormValid() ) {
      dispatch( startRegisterWithEmailPasswordName(email, password, name) );
    }
  }

  const isFormValid = () => {
    if ( name.trim().length === 0 ) {
      dispatch( setError('Name required') );
      return false;
    } else if ( !validator.isEmail( email ) ) {
      dispatch( setError('Email not valid') );
      Swal.fire('Error', msgError, 'error');
      return false;
    } else if ( password !== password2 || password.length < 6 ) {
      dispatch( setError("Password should be at least 6 characters and match") );
      Swal.fire('Error', msgError, 'error');
      return false;
    }
    dispatch( removeError() );
    return true;
  }

  return (
    <div className='auth__main'>
      <div className='auth__box-container'>
        <h3 className="auth__title">Register</h3>
        <form onSubmit={ handleRegister }>
          <input 
            type='text' 
            placeholder='Name'
            name='name' 
            className='auth__input'
            autoComplete='off'
            value={ name }
            onChange={ handleInputChange }
            
          />

          <input 
            type='text' 
            placeholder='Email'
            name='email' 
            className='auth__input'
            autoComplete='off'
            value={ email }
            onChange={ handleInputChange }
          />

          <input 
            type='password' 
            placeholder='Password'
            name='password'
            className='auth__input'
            autoComplete='off'
            value={ password }
            onChange={ handleInputChange }
          />

          <input 
            type='password' 
            placeholder='Confirm password'
            name='password2'
            className='auth__input'
            autoComplete='off'
            value={ password2 }
            onChange={ handleInputChange }
          />

          <button 
            type='submit'
            className='btn btn-primary btn-block mb-5'
            disabled={ !name || !validator.isEmail( email ) || !password }
          >
            Register
          </button>

          <Link to="/login" className='link'>
            Already registered?
          </Link>

        </form>
      </div>
    </div>
  )
}
