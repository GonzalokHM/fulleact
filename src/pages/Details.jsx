import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { getProductById } from '../api/products'
import useStore from '../store/useStore'
import BuyAndWishlist from '../components/BuyAndWishlist'
import Stars from '../components/stars/Stars'
import Loader from '../components/Loader'

function Details() {
  const { id: product_id } = useParams() // asin
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const { user } = useStore()

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true)
      const { response, error } = await getProductById(product_id)
      if (error) {
        setError(error.message || 'Error al obtener el producto')
      } else {
        setProduct(response)
      }
      setLoading(false)
    }
    fetchProduct()
  }, [product_id])

  if (loading) return <Loader size='w-12 h-12' label='Examinando producto...' />
  if (error) return <p className='errortext'>{error}</p>
  if (!product) return <p>Producto no encontrado.</p>

  const discountRate = 0.9
  const isVip = user && user.vip
  const normalPrice = product.precio
  const vipPrice = isVip ? (normalPrice * discountRate).toFixed(2) : normalPrice

  return (
    <div className='contPading'>
      <h1 className='mb-4 text-center'>{product.titulo}</h1>
      <article className='flex flex-col md:flex-row'>
        <img
          src={product.img}
          alt={product.titulo}
          className='w-full md:w-1/2 object-cover mb-4 md:mb-0 md:mr-4'
        />
        <section className='flex flex-col justify-between'>
          <section>
            {isVip ? (
              <>
                <p>
                  Precio original:{' '}
                  <span className='line-through'>
                    ${normalPrice.toFixed(2)}
                  </span>
                </p>
                <p className='priceText vipPrice'>Precio VIP: ${vipPrice}</p>
              </>
            ) : (
              <p className='priceText'>Precio: ${normalPrice}</p>
            )}
            <section className='mt-4 py-2'>
              <BuyAndWishlist product={product} />
            </section>
            <Stars rating={product.puntuacion} />
            <p className='description backgBlur2'>{product.descripcion}</p>
            <p className='mb-2'>{product.marca}</p>
          </section>
          <section className='flex items-center mb-2 '>
            {product.categoria && (
              <Link
                to={`/search-results?name=${encodeURIComponent(
                  product.categoria.nombre
                )}&type=category`}
                className='flex items-center hover:underline'
              >
                <img
                  src={product.categoria.icono}
                  alt={product.categoria.nombre}
                  className='w-8 h-8 mr-2 rounded-b-sm'
                />
                <span className='categoryLink backgBlur rounded-t-sm'>
                  {product.categoria.nombre}
                </span>
              </Link>
            )}
          </section>
        </section>
      </article>
    </div>
  )
}

export default Details
