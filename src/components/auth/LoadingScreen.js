import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import Swal from 'sweetalert2';

export const LoadingScreen = () => {

  const { loading } = useSelector( store => store.ui );

  useEffect(() => {
    Swal.fire({
      title: 'Loading...',
      text: 'Please wait...',
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading()
      }
    });

    if ( !loading ) {
      Swal.close();
      <Navigate to='/' />
    }
  }, [loading]);

  return (
    <div className='loading-screen'>
    </div>
  )
}
