import { useParams } from 'react-router-dom'

function Details() {
  const { id } = useParams()

  // buscar los detalles del producto en backend o estado global
  return (
    <div className='p-4'>
      <h1 className='text-2xl font-bold'>Detalles del Producto {id}</h1>
      {/* detalles del producto */}
    </div>
  )
}

export default Details
