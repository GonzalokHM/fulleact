import { Link } from 'react-router-dom'
import BuyAndWishlist from './BuyAndWishlist'
import CompareButton from './CompareButton'

function ProductCard({
  product,
  showVipPrices = false,
  showWishlistToggle = true
}) {
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
      <CompareButton productId={product._id} />
      <img
        src={product.img}
        alt={product.titulo}
        className='w-full h-48 object-cover mb-4'
      />
      <h3>{product.titulo}</h3>
      {priceContent}
      <div className='flex justify-between'>
        <BuyAndWishlist
          product={product}
          showWishlistToggle={showWishlistToggle}
        />
        <Link to={`/product/${product.asin}`} className='btnInf'>
          Detalles
        </Link>
      </div>
    </div>
  )
}

export default ProductCard
