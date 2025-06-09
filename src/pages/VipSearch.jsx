import { startTransition, useActionState, useRef } from 'react'
import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { vipSearch } from '../api/products'
import ProductCard from '../components/ProductCard'
import { useFormStatus } from 'react-dom'
import Loader from '../components/Loader'

function SearchButton() {
  const { pending } = useFormStatus()
  return (
    <button type='submit' className='ml-2 btnVip' disabled={pending}>
      {pending ? 'Buscando...' : 'Buscar'}
    </button>
  )
}

function VipSearch() {
  const { search } = useLocation()
  const queryParams = new URLSearchParams(search)
  const initialName = queryParams.get('name') || ''

  const inputRef = useRef()
  const [products, setProducts] = useState([])
  const [error, searchAction, pending] = useActionState(async (_, formData) => {
    const term = formData.get('search')?.trim()
    if (!term) return 'Introduce un término de búsqueda'

    const { response, error } = await vipSearch(term)
    if (error) return error.message || 'Error al buscar productos'

    setProducts(response)
    return null
  }, null)

  useEffect(() => {
    if (initialName.trim()) {
      const formData = new FormData()
      formData.set('search', initialName)
      startTransition(() => {
        searchAction(formData)
      })
      if (inputRef.current) inputRef.current.value = initialName
    }
  }, [initialName, searchAction])

  return (
    <div className='contPading flexColCent'>
      <h2 className='px-2'>Búsqueda VIP de Productos</h2>
      <form action={searchAction} className='mb-4'>
        <input
          name='search'
          ref={inputRef}
          type='text'
          placeholder='Busca un producto...'
          className='px-4 py-2 border rounded w-64 backgBlur'
        />
        <SearchButton />
      </form>
      {pending && <Loader size='w-12 h-12' label='Buscando resultados...' />}
      {error && <p className='errortext'>{error}</p>}
      {!pending && products.length === 0 && !error && (
        <p className='font-bold'>No se encontraron productos.</p>
      )}
      {!pending && products.length > 0 && (
        <div className='gridRes'>
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
