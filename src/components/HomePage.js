import React from 'react';
import { NavBar } from './NavBar';
import { ShowRadar } from './radar/ShowRadar';

export const HomePage = () => {
  
  return (
    <>
      <NavBar />        
      <main>
        <ShowRadar/>
      </main>
    </>
  )
}
