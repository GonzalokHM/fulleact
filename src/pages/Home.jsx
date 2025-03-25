import { useEffect, useState } from 'react'
import {
  getUniqueProductPerCategory,
  getTopSellingPerCategory
} from '../api/products'
import Carousel from '../components/Carousel'
import useStore from '../store/useStore'

function Home() {
  const { user } = useStore()
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
      <section
        className="relative w-full h-[300px] flex items-center justify-center bg-cover bg-center
        bg-[url('https://picsum.photos/400/300/?blur')]
        sm:bg-[url('https://picsum.photos/800/300/?blur')]
        lg:bg-[url('https://picsum.photos/1200/300/?blur')]"
      >
        <div className='absolute inset-0 bg-black opacity-50'></div>
        <div className='relative text-center text-white px-4'>
          <h1 className='text-4xl font-bold'>
            Ahorra y encuentra lo que necesites
          </h1>
          {user && (
            <div className='flex flex-col items-center justify-center mt-4'>
              <p className={`text-xl${user.vip ? 'font-bold' : ''}`}>
                Hola, {user.username}
                {user.vip && (
                  <span className='bg-yellow-500 text-black px-2 py-1 rounded text-sm'>
                    VIP
                  </span>
                )}
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
          <p className='mt-2 text-xl'>Descubre las mejores ofertas en Amazon</p>
        </div>
      </section>

      <section className='container mx-auto px-4'>
        {loadingUnique ? (
          <p>Cargando productos...</p>
        ) : (
          <Carousel title='Encuentra lo que buscas' products={uniqueProducts} />
        )}

        {loadingTop ? (
          <p>Cargando top ventas...</p>
        ) : (
          <Carousel title='Top ventas' products={topSellingProducts} />
        )}
        {error && <p className='text-red-500'>{error}</p>}
      </section>
    </>
  )
}

export default Home
