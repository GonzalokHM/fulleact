import { useCallback, useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { vipSearch } from '../api/products'
import ProductCard from '../components/ProductCard'

function VipSearch() {
  const { search } = useLocation()
  const queryParams = new URLSearchParams(search)
  const initialName = queryParams.get('name') || ''

  const [searchTerm, setSearchTerm] = useState(initialName)
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSearch = useCallback(
    async (e) => {
      if (e && typeof e.preventDefault === 'function') {
        e.preventDefault()
      }
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
    },
    [searchTerm]
  )

  useEffect(() => {
    if (initialName.trim()) {
      handleSearch()
    }
  }, [initialName, handleSearch])

  return (
    <div className='p-4 flexColCent'>
      <h2>Búsqueda VIP de Productos</h2>
      <form onSubmit={handleSearch} className='mb-4'>
        <input
          type='text'
          placeholder='Busca un producto...'
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className='px-4 py-2 border rounded w-64'
        />
        <button type='submit' className='ml-2 btnVip'>
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
              key={product._id}
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
