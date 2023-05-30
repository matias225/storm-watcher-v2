import React from 'react'
import { NavBar } from '../ui/NavBar'
import { NavLink } from 'react-router-dom'

export default function AdminPanel() {

  return (
    <>
      <NavBar/>
      <div>
        <ul className='admin__list'>
          <li><NavLink to='/newalert'>Crear nueva alerta</NavLink></li>
        </ul>
      </div>
    </>
  )
}
