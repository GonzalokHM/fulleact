import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { filterProducts } from '../api/productApi'
import ProductCard from '../components/ProductCard'

function SearchResults() {
  const { search } = useLocation()
  const queryParams = new URLSearchParams(search)
  const name = queryParams.get('name') || ''
  const type = queryParams.get('type') || 'name'

  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchResults = async () => {
      if (!name.trim()) return
      setLoading(true)
      setError('')
      let params = {}
      if (type === 'category') {
        params = { categoriaName: name }
      } else {
        params = { name }
      }
      const { response, error } = await filterProducts(params)
      if (error) {
        setError(error.message || 'Error al buscar productos')
      } else {
        setProducts(response)
      }
      setLoading(false)
    }
    fetchResults()
  }, [name, type])

  return (
    <div className='p-4'>
      <h1 className='text-3xl font-bold mb-4'>Resultados de búsqueda</h1>
      {loading && <p>Cargando resultados...</p>}
      {error && <p className='text-red-500'>{error}</p>}
      {!loading && products.length === 0 && (
        <p>No se encontraron productos. Intenta con otro término.</p>
      )}
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
        {products.map((product) => (
          <ProductCard key={product._id || product.asin} product={product} />
        ))}
      </div>
    </div>
  )
}

export default SearchResults
