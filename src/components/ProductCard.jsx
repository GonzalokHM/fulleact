import { Link } from 'react-router-dom'

function ProductCard({ product, showVipPrices = false }) {
  let priceContent
  if (showVipPrices) {
    const discountRate = 0.9
    const originalPrice = (product.precio / discountRate).toFixed(2)
    priceContent = (
      <>
        <p className='text-gray-700 text-sm'>
          Precio original:{' '}
          <span className='line-through'>${originalPrice}</span>
        </p>
        <p className='text-green-700 font-bold text-lg'>
          Precio VIP: ${product.precio.toFixed(2)}
        </p>
      </>
    )
  } else {
    priceContent = (
      <p className='text-gray-700 mb-2'>Precio: ${product.precio}</p>
    )
  }
  return (
    <div className='border rounded shadow p-4 flex flex-col'>
      <img
        src={product.img}
        alt={product.titulo}
        className='w-full h-48 object-cover mb-4'
      />
      <h2 className='text-xl font-bold mb-2'>{product.titulo}</h2>
      {priceContent}
      <div className='mt-auto flex justify-between'>
        <a
          href={`https://www.amazon.es/dp/${product.asin}`}
          target='_blank'
          rel='noopener noreferrer'
          className='bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded'
        >
          Comprar
        </a>
        <Link
          to={`/product/${product.asin}`}
          className='bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded'
        >
          Detalles
        </Link>
      </div>
    </div>
  )
}

export default ProductCard
