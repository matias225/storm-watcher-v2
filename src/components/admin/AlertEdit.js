import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavBar } from '../ui/NavBar';
import { Navigate, useNavigate } from 'react-router-dom';
import { useForm } from '../../hooks/useForm';
import { activeAlert, startSaveAlert } from '../../actions/alerts';

export const AlertEdit = () => {

  const dispatch = useDispatch();
  const { loading } = useSelector( state => state.ui );
  const { active:alert } = useSelector( state => state.alerts );
  const { uid } = useSelector( state => state.auth );
  const { isAdmin } = useSelector( state => state.admin );
  const [ formValues, handleInputChange, reset ] = useForm( alert );
  const { body, title } = formValues;
  const activeId = useRef( alert.id );
  const navigate = useNavigate();
  
  useEffect(() => {
    if (alert.id !== activeId.current ) {
      reset( alert );
      activeId.current = alert.id;
    }
  }, [alert, reset])

  useEffect(() => {
    dispatch( activeAlert( formValues.id, { ...formValues }));
  }, [formValues, dispatch])
  
  if (!uid || !isAdmin || !alert) {
    return <Navigate to="/" replace />;
  }

  const handleEditAlert = (e) => {
    e.preventDefault();
    dispatch( startSaveAlert( alert ) );
    navigate('/alerts');
  }

  const handleBackClick = (e) => {
    e.preventDefault();
    navigate('/alerts');
  }

  return (
    <>
      <NavBar/>
      <div>
        <h1 className='alert__main-title'>
          Editar alerta
        </h1>
        <form
          onSubmit={ handleEditAlert }
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
              Guardar cambios
            </button>
          </div>
        </form>
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
