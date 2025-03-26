import { Link } from 'react-router-dom'

function NotFound() {
  return (
    <section className='flexColCent bg-red-400 p-4'>
      <h1>404</h1>
      <h3>Página no encontrada</h3>
      <Link to='/' className='btnInf'>
        Volver a Home
      </Link>
    </section>
  )
}

export default NotFound
