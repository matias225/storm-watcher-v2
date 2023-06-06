import moment from 'moment';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { activeAlert, startDeleting } from '../../actions/alerts';
import { useNavigate } from 'react-router-dom';

export const AlertComponent = ({ id, body, title, date }) => {
  
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isAdmin } = useSelector( state => state.admin );  
  const alertDate = moment(date);
  const alert = {
    body, title, date
  }

  const handleEdit = () => {
    dispatch( activeAlert(id, alert) );
    navigate(`/editalert`);
  }

  const handleDelete = () => {
    dispatch( startDeleting(id) );
  }
  
  return (
    <>
      <div>
        <p className='alert__title'>
          { title }
        </p>
        <p className='alert__body'>
          { body }
        </p>
        <p className='alert__date'>
          { alertDate.format('MMMM Do YYYY, h:mm:ss a') }
        </p>
        { isAdmin && 
          <>
            <button
              className='btn-primary' 
              onClick={handleEdit}
            >
              Edit
            </button>
            <button
              className='btn-delete' 
              onClick={handleDelete}
            >
              Delete
            </button>
          </>
        }
      </div>
      <br></br>
      <hr></hr>
    </>
  )
}
