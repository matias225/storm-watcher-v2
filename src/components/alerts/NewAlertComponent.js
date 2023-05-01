import React from 'react';
import { NavBar } from '../ui/NavBar';
import { useDispatch, useSelector } from 'react-redux';
import { startNewAlert } from '../../actions/alerts';
import { useForm } from '../../hooks/useForm';
import { Navigate, useNavigate } from 'react-router-dom';
import { sendPushNotifications } from '../../helpers/sendPushNotification';
import { getTokensFromFirestore } from '../../helpers/getTokensFromFirestore';

export const NewAlertComponent = () => {
  const { loading } = useSelector( state => state.ui );
  const { uid } = useSelector( state => state.auth );
  const { isAdmin } = useSelector( state => state.admin );
  // const isAdmin = localStorage.getItem("isAdmin");
  
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const [formValues, handleInputChange ] = useForm({
    title: '',
    body: ''
  });

  const { title, body } = formValues;

  if (!uid || !isAdmin) {
    return <Navigate to="/" replace />;
  } 

  const handleAddNew = (e) => {
    e.preventDefault();
    dispatch( startNewAlert(title, body) );
    navigate('/alerts');
  }

  const handleSendNotification = () => {
    // Traigo todos los tokens desde Firestore en un Array y armo el objeto
    getTokensFromFirestore()
     .then((tokensArray) => {
      console.log('tokensArray: ', JSON.stringify(tokensArray));
      sendPushNotifications(title, body, tokensArray)
   });
  }

  return (
    <>
      <NavBar />
      <div>
        <h1 className='alert__main-title'>
          Crear nueva alerta
        </h1>
        <form 
          onSubmit={ handleAddNew }
          className='alert__main-content'  
        >
          <input
            type='text'
            placeholder='Titulo'
            className='alert__title-input'
            autoComplete='off'
            name='title'
            value={ title }
            onChange={ handleInputChange }
            />

          <textarea 
            placeholder='Descripcion de la alerta'
            className='alert__textarea'
            name='body'
            value={ body }
            onChange={ handleInputChange }
            ></textarea>
          
          <div className='alert__button'>
            <button 
              type='submit'
              className='btn btn-primary'
              disabled={ loading || !title || !body }
            >
              Create new alert
            </button>
           
          </div>
        </form>


        <div className='alert__button'>
          <button 
            className='btn btn-primary'
            onClick={ handleSendNotification }
          >
            Send Notification
          </button>
        </div>
        


      </div>
    </>
  )
}
