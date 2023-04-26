import React, { useEffect } from 'react';
import { NavBar } from './NavBar';
import { ShowRadar } from './radar/ShowRadar';
import { getIsAdminFromFirestore } from '../actions/auth';
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';


export const HomePage = () => {
  const { uid } = useSelector( state => state.auth );
  const { isAdmin } = useSelector( state => state.admin );

  const dispatch = useDispatch();
  
  useEffect(() => {
    if (isAdmin === null) {
      Swal.fire({
        title: 'Loading...',
        text: 'Please wait...',
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading()
        }
      });
        dispatch( getIsAdminFromFirestore(uid))
          .finally(() => {
            Swal.close();
          });
      } else {
        Swal.close();
      }
    }, [isAdmin, dispatch, uid])


  return (
    <>
      {
        ( isAdmin !== null ) 
        ? (
        <>
          <NavBar />        
          <main>
            <ShowRadar/>
          </main>
        </>
        ) : <></>
      }
    </>
  )
}
