import { startTransition, useActionState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { filterProducts } from '../api/products'
import ProductCard from '../components/ProductCard'
import { vipSearchMoreByCategory } from '../api/category'

function SearchResults() {
  const { search } = useLocation()
  const navigate = useNavigate()
  const queryParams = new URLSearchParams(search)
  const name = queryParams.get('name') || ''
  const type = queryParams.get('type') || 'name'

  const [state, fetchResults, pending] = useActionState(
    async () => {
      if (!name.trim()) return { products: [], error: '' }

      let params = {}
      if (type === 'category') {
        params = { categoriaName: name }
      } else {
        params = { name }
      }

      const { response, error } = await filterProducts(params)
      return {
        products: error ? [] : response,
        error: error?.message || ''
      }
    },
    { products: [], error: '' }
  )

  useEffect(() => {
    startTransition(() => {
      fetchResults()
    })
  }, [name, type, fetchResults])

  const handleVipSearch = () => {
    navigate(`/vipSearch?name=${encodeURIComponent(name)}`)
  }

  const handleLoadMore = async () => {
    const { error: loadError } = await vipSearchMoreByCategory(name)
    if (loadError) {
      console.error('Error cargando más:', loadError)
      return
    }
    startTransition(() => {
      fetchResults()
    })
  }

  const { products, error } = state

  return (
    <div className='contPading'>
      <h2 className='w-fit px-1'>Resultados de búsqueda</h2>
      {pending && (
        <Loader size='w-12 h-12' label={`Buscando ${name || 'producto'}...`} />
      )}
      {error && <p className='errortext'>{error}</p>}
      {!pending && products.length === 0 && (
        <section className='flexColCent contPading' aria-live='polite'>
          <h3 className='mb-2 text-red-400'>No se encontraron productos.</h3>
          <p className='mb-3'>Intenta con otro término.</p>
          <p className='mb-4'>
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
      <section className='gridRes' aria-live='polite'>
        {products.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </section>
      {type === 'category' && products.length > 0 && (
        <div className='flex justify-center mt-4'>
          <button type='button' onClick={handleLoadMore} className='btnVip'>
            {pending ? 'Cargando…' : 'Cargar más productos'}
          </button>
        </div>
      )}
    </div>
  )
}

export default SearchResults
