import { addToWishlist, removeFromWishlist } from '../api/wishList'
import useStore from '../store/useStore'

function WishlistToggle({ productId, className = '' }) {
  const { wishlist, setWishlist, user } = useStore()
  const isInWishlist = wishlist.includes(productId)

  const handleClick = async () => {
    if (!user) {
      if (isInWishlist) {
        setWishlist(wishlist.filter((id) => id !== productId))
      } else {
        setWishlist([...wishlist, productId])
      }
      return
    }

    if (isInWishlist) {
      const { response, error } = await removeFromWishlist(productId)
      if (response) {
        setWishlist(wishlist.filter((id) => id !== productId))
      } else {
        console.error(error)
      }
    } else {
      const { response, error } = await addToWishlist(user._id, productId)
      if (response) {
        setWishlist([...wishlist, productId])
      } else {
        console.error(error)
      }
    }
  }

  return (
    <button
      onClick={handleClick}
      className={`focus:outline-none ${className}`}
      aria-label='Toggle Wishlist'
    >
      {isInWishlist ? (
        <svg
          xmlns='http://www.w3.org/2000/svg'
          className='heart text-red-500'
          viewBox='0 0 20 20'
          fill='currentColor'
        >
          <path
            fillRule='evenodd'
            d='M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 18.657l-6.828-6.829a4 4 0 010-5.656z'
            clipRule='evenodd'
          />
        </svg>
      ) : (
        <svg
          xmlns='http://www.w3.org/2000/svg'
          className='heart text-gray-500'
          fill='none'
          viewBox='0 0 24 24'
          stroke='currentColor'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth={2}
            d='M4.318 6.318a4.5 4.5 0 016.364 0L12 7.636l1.318-1.318a4.5 4.5 0 016.364 6.364L12 21l-7.682-8.318a4.5 4.5 0 010-6.364z'
          />
        </svg>
      )}
    </button>
  )
}

export default WishlistToggle
