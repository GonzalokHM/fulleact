import { useState, useEffect } from 'react'
import useStore from '../store/useStore'
import { getProductById } from '../api/products'
import ComparisonTable from '../components/VsTable'

function Vs() {
  const { comparison, removeComparison, clearComparison } = useStore()
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true)
      setError('')
      try {
        const productPromises = comparison.map((id) => getProductById(id))
        const results = await Promise.all(productPromises)
        const fetchedProducts = results.map((result) => result.response)
        setProducts(fetchedProducts)
      } catch (err) {
        console.error(err)
        setError('Error al cargar los productos')
      }
      setLoading(false)
    }

    if (comparison.length > 0) {
      fetchProducts()
    } else {
      setProducts([])
    }
  }, [comparison])

  return (
    <div className='p-4'>
      <h2>Comparar Productos</h2>
      {comparison.length === 0 && (
        <p>No has seleccionado productos para comparar.</p>
      )}
      {loading && <p>Cargando productos...</p>}
      {error && <p className='errortext'>{error}</p>}
      {products.length > 0 && (
        <ComparisonTable
          products={products}
          removeComparison={removeComparison}
        />
      )}
      {comparison.length > 0 && (
        <button onClick={clearComparison} className='btnDeleteVs'>
          Limpiar Comparación
        </button>
      )}
    </div>
  )
}

export default Vs
