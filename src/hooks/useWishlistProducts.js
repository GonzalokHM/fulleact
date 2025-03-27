import useStore from '../store/useStore'

export default function useWishlistProduct(productId) {
  const isInWishlist = useStore(
    (state) =>
      Array.isArray(state.wishlist) && state.wishlist.includes(productId)
  )
  const addToLocalWishlist = useStore((state) => state.setWishlist)
  const user = useStore((state) => state.user)

  return {
    isInWishlist,
    setWishlist: addToLocalWishlist,
    user
  }
}
