import React from 'react';
import { Link, Navigate } from 'react-router-dom';
import validator from 'validator';
import { useForm } from '../../hooks/useForm';
import { useDispatch, useSelector } from 'react-redux';
import { startGoogleLogin, startLoginEmailPassword } from '../../actions/auth';
import { removeError, setError } from '../../actions/ui';
import Swal from 'sweetalert2';

export const LoginScreen = () => {

  const dispatch = useDispatch();
  const { loading, msgError } = useSelector( state => state.ui );
  const { uid } = useSelector( state => state.auth );

  const [formValues, handleInputChange ] = useForm({
    email: 'matias@gmail.com',
    password: '123456'
  });

  const { email, password } = formValues;

  // Solucion al problema de que no redirigia cuando logueaba desde la pagina login
  // Verifico que ya esta logueado verificando si existe la uid que devuelve Firebase, dentro del store
  if (uid) {
    return <Navigate to="/" replace />;
  } 

  const handleLogin = (event) => {
    event.preventDefault();
    if ( isFormValid() ) {
      dispatch( startLoginEmailPassword(email, password) ); 
    }
  };

  const isFormValid = () => {
    if ( !validator.isEmail( email ) ) {
      dispatch( setError('Email not valid') );
      Swal.fire('Error', msgError, 'error');
      return false;
    } else if ( password < 6 ) {
      dispatch( setError("Password should be at least 6 characters and match") );
      Swal.fire('Error', msgError, 'error');
      return false;
    }
    dispatch( removeError() );
    return true;
  }

  const handleGoogleLogin = () => {
    dispatch( startGoogleLogin() );
  }

  return (
    <div className='auth__main'>
      <div className='auth__box-container'>
        <h3 className="auth__title">Login</h3>
        <form onSubmit={ handleLogin }> 
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
          <button   
            className='btn btn-primary btn-block'
            disabled={ loading }
          >
            Login
          </button>

          <div className='auth__social-networks'>
            <p>Login with social networks</p>
            <div 
              className="google-btn"
              onClick={ handleGoogleLogin }
            >
              <div className="google-icon-wrapper">
                <img className="google-icon" src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" alt="google button" />
              </div>
              <p className="btn-text">
                <b>Sign in with google</b>
              </p>
            </div>
          </div>

          <Link to="/register" className='link'>
            Create new account
          </Link>
        </form>
      </div>
    </div>
  )
}