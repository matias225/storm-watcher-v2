import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

export const AuthRouter = ({
  isAuthenticated,
}) => {
  if (!isAuthenticated) {
    return <Navigate to='/login' />
  } else {
    return <Outlet /> 
  }
} 