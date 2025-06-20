import { Link } from 'react-router-dom'
import BuyAndWishlist from './BuyAndWishlist'
import CompareButton from './vs/CompareButton'

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
        <p className='vipPrice text-lg'>
          Precio VIP: ${product.precio.toFixed(2)}
        </p>
      </>
    )
  } else {
    priceContent = <p className='priceText'>${product.precio}</p>
  }
  return (
    <div className='flex flex-col justify-between'>
      <CompareButton productId={product._id} />
      <Link to={`/product/${product._id}`}>
        <img
          src={product.img}
          alt={product.titulo}
          loading='lazy'
          width={400}
          height={192}
          className='mb-4'
        />
      </Link>
      <h3 className='line-clamp-3 rounded-lg text-center'>{product.titulo}</h3>
      {priceContent}
      <div className='flex justify-between'>
        <BuyAndWishlist
          product={product}
          showWishlistToggle={showWishlistToggle}
        />
        <Link to={`/product/${product._id}`} className='btnInf'>
          Detalles
        </Link>
      </div>
    </div>
  )
}

export default ProductCard
