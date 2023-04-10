import { Link } from 'react-router-dom';
import { useState } from 'react';

export function LoginScreen() {

  const [ email, setEmail ] = useState('');
  const [ password, setPassword ] = useState('');


  const submit = () => {
    console.log(email, password);
  }

  return (
    <div className='auth__main'>
      <div className='auth__box-container'>
        <h3 className="auth__title">Login</h3>
        <form>
          <input 
            type='text' 
            placeholder='Email'
            name='email' 
            className='auth__input'
            autoComplete='off'
          />

          <input 
            type='password' 
            placeholder='Password'
            name='password'
            className='auth__input'
            autoComplete='off'
          />

          <button 
            type='submit'
            className='btn btn-primary btn-block'
            // disabled={true}
          >
            Login
          </button>

          <div className='auth__social-networks'>
            <p>Login with social networks</p>
            <div 
              className="google-btn"
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