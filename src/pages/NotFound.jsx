import { Link } from 'react-router-dom'

function NotFound() {
  return (
    <div className='flex flex-col items-center justify-center bg-red-400 p-4'>
      <h1 className='text-5xl font-bold text-gray-800 mb-4'>404</h1>
      <p className='text-xl text-gray-700 mb-8'>Página no encontrada</p>
      <Link
        to='/'
        className='px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600'
      >
        Volver a Home
      </Link>
    </div>
  )
}

export default NotFound
