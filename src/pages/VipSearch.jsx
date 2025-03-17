import { useState } from 'react'
import { vipSearch } from '../api/products'
import ProductCard from '../components/ProductCard'

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
    setLoading(true)
    setError('')
    try {
      const { response, error } = await vipSearch(searchTerm)
      if (error) {
        setError(error.message || 'Error al buscar productos')
      } else {
        setProducts(response)
      }
    } catch (err) {
      console.error(err)
      setError('Error al buscar productos. Intenta de nuevo.')
    }
    setLoading(false)
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
      {products.length === 0 && !loading ? (
        <p>No se encontraron productos.</p>
      ) : (
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
          {products.map((product) => (
            <ProductCard
              key={product._id || product.asin}
              product={product}
              showVipPrices={true}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default VipSearch
