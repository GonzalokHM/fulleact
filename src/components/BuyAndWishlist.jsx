import WishlistToggle from './WishListTogle'

function BuyAndWishlist({ product, showWishlistToggle = true }) {
  return (
    <section className='flex items-center space-x-2'>
      <a
        href={`https://www.amazon.es/dp/${product.asin}`}
        target='_blank'
        rel='noopener noreferrer'
        className='bg-green-500 hover:bg-green-600 text-white py-2 px-3 rounded'
      >
        Comprar
      </a>
      {showWishlistToggle && <WishlistToggle productId={product._id} />}
    </section>
  )
}

export default BuyAndWishlist
