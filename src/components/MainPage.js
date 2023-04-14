import { Link } from 'react-router-dom'

export function MainPage() {
  return (
    <>

        <h3>
            Bienvenido a StormApp
        </h3>


          <Link to={`/login`}>
            <button>
              Ingresar
            </button> 
          </Link>
          <Link to={`/register`}>
            <button >
              Registrar
            </button> 
          </Link>

    </>
  )
}