import moment from 'moment';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { startDeleting } from '../../actions/alerts';

export const AlertComponent = ({ id, body, title, date }) => {
  
  const { isAdmin } = useSelector( state => state.admin );  
  const dispatch = useDispatch();
  const alertDate = moment(date);

  const handleEdit = () => {
    console.log('Editando alert')
    // dispatch( setActive )
    console.log(id)
  }

  const handleDelete = () => {
    console.log('Borrando alert')
    dispatch( startDeleting(id) );
    console.log(id)
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
            <button onClick={handleEdit}>Edit</button>
            <button onClick={handleDelete}>Delete</button>
          </>
        }
      </div>
      <br></br>
      <hr></hr>
    </>
  )
}
