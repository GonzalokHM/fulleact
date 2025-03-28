import { useEffect, useState } from 'react'
import {
  getUniqueProductPerCategory,
  getTopSellingPerCategory
} from '../api/products'
import Carousel from '../components/Carousel'
import useStore from '../store/useStore'
import Loader from '../components/Loader'

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
      <section className='welcomeImg'>
        <div className='absolute inset-0 bg-black opacity-50'></div>
        <div className='relative text-center text-white px-4'>
          <h1>Ahorra y encuentra lo que necesites</h1>
          {user && (
            <div className='flex flex-col items-center justify-center mt-4'>
              <p className={`text-xl${user.vip ? 'font-bold' : ''}`}>
                Hola, {user.username}
                {user.vip && <span className='viplogo'>VIP</span>}
              </p>

              {user.avatar && (
                <img
                  src={user.avatar}
                  alt='Avatar de usuario'
                  className='w-12 h-12 rounded-full object-cover mr-2'
                />
              )}
            </div>
          )}
          <h3 className='mt-2 text-amber-100'>
            Descubre las mejores ofertas en Amazon
          </h3>
        </div>
      </section>

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
