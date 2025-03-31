import useStore from '../store/useStore'
import { addToWishlist, removeFromWishlist } from '../api/wishList'
import useWishlistProduct from '../hooks/useWishlistProducts'

function WishlistToggle({ productId, className = '' }) {
  const { isInWishlist, setWishlist, user } = useWishlistProduct(productId)

  const handleClick = async () => {
    const current = useStore.getState().wishlist || []

    const updatedWishlist = isInWishlist
      ? current.filter((id) => id !== productId)
      : [...current, productId]

    if (!user) {
      setWishlist(updatedWishlist)
      return
    }

    const apiCall = isInWishlist
      ? removeFromWishlist(productId)
      : addToWishlist(user._id, productId)

    const { response, error } = await apiCall
    if (response) {
      setWishlist(updatedWishlist)
    } else {
      console.error(error)
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
          className='heart'
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
