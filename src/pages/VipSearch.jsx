import { useState } from 'react'
import axios from 'axios'
import useStore from '../store/useStore'

function VipSearch() {
  const [searchTerm, setSearchTerm] = useState('')
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSearch = async (e) => {
    e.preventDefault()
    if (!searchTerm.trim()) {
      setError('Introduce un término de búsqueda')
      return
    }
    try {
      setLoading(true)
      setError('')
      const response = await axios.get('/api/products/vipSearch', {
        params: { name: searchTerm }
      })
      setProducts(response.data)
      setLoading(false)
    } catch (err) {
      console.error(err)
      setLoading(false)
      setError('Error al buscar productos. Intenta de nuevo.')
    }
  }

  return (
    <div className='p-4'>
      <h1 className='text-3xl font-bold mb-4'>Búsqueda VIP de Productos</h1>
      <form onSubmit={handleSearch} className='mb-4'>
        <input
          type='text'
          placeholder='Busca un producto...'
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className='px-4 py-2 border rounded w-64'
        />
        <button
          type='submit'
          className='ml-2 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600'
        >
          {loading ? 'Buscando...' : 'Buscar'}
        </button>
      </form>
      {error && <p className='text-red-500 mb-4'>{error}</p>}
      <div>
        {products.length === 0 && !loading ? (
          <p>No se encontraron productos.</p>
        ) : (
          <ul>
            {products.map((product) => (
              <li key={product._id} className='border p-2 mb-2 rounded'>
                <h2 className='text-xl font-bold'>{product.titulo}</h2>
                <p>Precio: {product.precio}</p>
                {product.descripcion && <p>{product.descripcion}</p>}
                {/*  agregar más detalles y botones  */}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}

export default VipSearch
