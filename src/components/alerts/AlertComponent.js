import moment from 'moment';
import React from 'react';

export const AlertComponent = ({ body, title, date }) => {
  
  const alertDate = moment(date);
  
  return (
    <>
      <div className='alert__alert'>
        <p className='journal__entry-title'>
          { title }
        </p>
        <p className='journal__entry-content'>
          { body }
        </p>
        <p className='journal__entry-content'>
          { alertDate.format('MMMM Do YYYY, h:mm:ss a') }
        </p>
      </div>
      <br></br>
    </>
  )
}
