import { Link } from 'react-router-dom'

export function MainPage() {
  return (
    <>

        <h3 as="h1" size="lg" m={4}>
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