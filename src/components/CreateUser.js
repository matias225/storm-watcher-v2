import { useState } from 'react';
import { createUser } from '../services/createUser';
import { Link } from 'react-router-dom';

export function CreateUser() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    pass: ''
  });

  // Manejador de cambios en el formulario
  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.id]: event.target.value
    });
  };
  
  // Manejador de envio de formulario
  const handleSubmit = (event) => {
    console.log(formData);
    createUser(formData);
  };

  return (
    <div className='auth__main'>
      <div className='auth__box-container'>
        <h3 className="auth__title">Register</h3>
        <form onSubmit={handleSubmit}>
          <input 
            type='text' 
            placeholder='Name'
            name='name' 
            className='auth__input'
            autoComplete='off'
            onChange={handleChange}
          />

          <input 
            type='text' 
            placeholder='Email'
            name='email' 
            className='auth__input'
            autoComplete='off'
            onChange={handleChange}
          />

          <input 
            type='password' 
            placeholder='Password'
            name='password'
            className='auth__input'
            autoComplete='off'
            onChange={handleChange}
          />

          <input 
            type='password' 
            placeholder='Confirm password'
            name='password2'
            className='auth__input'
            autoComplete='off'
            onChange={handleChange}
          />

          <button 
            type='submit'
            className='btn btn-primary btn-block mb-5'
            // disabled={true}
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