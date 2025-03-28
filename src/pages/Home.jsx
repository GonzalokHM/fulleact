import { useEffect, useState } from 'react'
import {
  getUniqueProductPerCategory,
  getTopSellingPerCategory
} from '../api/products'
import Carousel from '../components/Carousel'
import useStore from '../store/useStore'
import Loader from '../components/Loader'
import Hero from '../components/Hero'

function Home() {
  const user = useStore((state) => state.user)
  const [uniqueProducts, setUniqueProducts] = useState([])
  const [topSellingProducts, setTopSellingProducts] = useState([])
  const [loadingUnique, setLoadingUnique] = useState(false)
  const [loadingTop, setLoadingTop] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchUnique = async () => {
      setLoadingUnique(true)
      const { response, error } = await getUniqueProductPerCategory()
      if (error) {
        setError(error.message || 'Error al obtener productos únicos')
      } else {
        setUniqueProducts(response)
      }
      setLoadingUnique(false)
    }

    const fetchTop = async () => {
      setLoadingTop(true)
      const { response, error } = await getTopSellingPerCategory()
      if (error) {
        setError(error.message || 'Error al obtener top ventas')
      } else {
        setTopSellingProducts(response)
      }
      setLoadingTop(false)
    }

    fetchUnique()
    fetchTop()
  }, [])

  return (
    <>
      <Hero user={user} />

      <section className='container mx-auto px-4'>
        {loadingUnique ? (
          <Loader size='w-12 h-12' label='Analizando lo que buscas...' />
        ) : (
          <Carousel title='Encuentra lo que buscas' products={uniqueProducts} />
        )}

        {loadingTop ? (
          <Loader size='w-12 h-12' label='recopilando top ventas...' />
        ) : (
          <Carousel title='Top ventas' products={topSellingProducts} />
        )}
        {error && <p className='errortext'>{error}</p>}
      </section>
    </>
  )
}

export default Home
