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
    <div className='contPading'>
      <h2 className='backgBlur2 w-fit px-1'>Resultados de búsqueda</h2>
      {loading && <p>Cargando resultados...</p>}
      {error && <p className='errortext'>{error}</p>}
      {!loading && products.length === 0 && (
        <section className='flexColCent contPading' aria-live='polite'>
          <h3 className='backgBlur5'>No se encontraron productos.</h3>
          <p className='mb-1 backgBlur'>revisa la ortografia</p>
          <p className='mb-1 backgBlur'>Intenta con otro término.</p>
          <p className='mb-4 backgBlur'>
            O prueba la búsqueda VIP para obtener resultados adicionales.
          </p>
          <button
            type='button'
            onClick={handleVipSearch}
            className='mt-4 btnVip'
          >
            Ir a VIP Search
          </button>
        </section>
      )}
      <section className='gridRes'>
        {products.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </section>
    </div>
  )
}

export default SearchResults
