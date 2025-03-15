import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getProductByASIN } from '../api/productApi'

function Details() {
  const { id } = useParams() // correspondiente al asin
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true)
      const { response, error } = await getProductByASIN(id)
      if (error) {
        setError(error.message || 'Error al obtener el producto')
      } else {
        setProduct(response)
      }
      setLoading(false)
    }
    fetchProduct()
  }, [id])

  if (loading) return <p>Cargando...</p>
  if (error) return <p className='text-red-500'>{error}</p>
  if (!product) return <p>Producto no encontrado.</p>

  return (
    <div className='p-4'>
      <h1 className='text-3xl font-bold mb-4'>{product.titulo}</h1>
      <div className='flex flex-col md:flex-row'>
        <img
          src={product.img}
          alt={product.titulo}
          className='w-full md:w-1/2 object-cover mb-4 md:mb-0 md:mr-4'
        />
        <div>
          <p className='text-xl mb-2'>Precio: ${product.precio}</p>
          <p className='mb-2'>Marca: {product.marca}</p>
          <div className='flex items-center mb-2'>
            {product.categoria && (
              <>
                <img
                  src={product.categoria.icono}
                  alt={product.categoria.nombre}
                  className='w-8 h-8 mr-2'
                />
                <span>{product.categoria.nombre}</span>
              </>
            )}
          </div>
          <p className='mb-2'>Puntuación: {product.puntuacion}</p>
          <p>{product.descripcion}</p>
        </div>
      </div>
    </div>
  )
}

export default Details
