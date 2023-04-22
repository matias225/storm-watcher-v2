import moment from 'moment';
import React from 'react';

export const AlertComponent = ({ body, title, date }) => {
  
  const alertDate = moment(date);
  
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
      </div>
      <hr></hr>
    </>
  )
}
