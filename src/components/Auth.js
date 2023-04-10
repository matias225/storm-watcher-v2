import React, { useState } from 'react';
import 'firebase/auth';

export const Auth = () => {
  const [ email, setEmail ] = useState('');
  const [ password, setPassword ] = useState('');

  return (
    <div>Auth</div>
  )
}
