import { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { filterProducts } from '../api/products'
import ProductCard from '../components/ProductCard'

function SearchResults() {
  const { search } = useLocation()
  const navigate = useNavigate()
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

  const handleVipSearch = () => {
    navigate(
      `/vipSearch?name=${encodeURIComponent(name)}&type=${encodeURIComponent(
        type
      )}`
    )
  }

  return (
    <div className='p-4'>
      <h2 className='text-3xl font-bold mb-4'>Resultados de búsqueda</h2>
      {loading && <p>Cargando resultados...</p>}
      {error && <p className='text-red-500'>{error}</p>}
      {!loading && products.length === 0 && (
        <section
          className='flex flex-col items-center text-center p-4'
          aria-live='polite'
        >
          <h3 className='text-xl font-bold mb-2'>
            No se encontraron productos.
          </h3>
          <p className='mb-1'>revisa la ortografia</p>
          <p className='mb-1'>Intenta con otro término.</p>
          <p className='mb-4'>
            O prueba la búsqueda VIP para obtener resultados adicionales.
          </p>
          <button
            type='button'
            onClick={handleVipSearch}
            className='mt-4 bg-green-500 text-white px-3 py-1 rounded text-sm'
          >
            Ir a VIP Search
          </button>
        </section>
      )}
      <section className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
        {products.map((product) => (
          <ProductCard key={product._id || product.asin} product={product} />
        ))}
      </section>
    </div>
  )
}

export default SearchResults
