import { useEffect, useState } from 'react'
import useStore from '../store/useStore'
import { getWishlist, removeFromWishlist } from '../api/wishlist'
import ProductCard from '../components/ProductCard'

function Wishlist() {
  const { user } = useStore()
  const [wishlistItems, setWishlistItems] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchWishlist = async () => {
      if (!user) return
      setLoading(true)
      setError('')
      const { response, error } = await getWishlist(user._id)
      if (error) {
        setError(error.message || 'Error al obtener la wishlist')
      } else {
        setWishlistItems(response)
      }
      setLoading(false)
    }

    fetchWishlist()
  }, [user])

  const handleRemove = async (wishlistItemId) => {
    const { response, error } = await removeFromWishlist(wishlistItemId)
    if (response) {
      setWishlistItems(
        wishlistItems.filter((item) => item._id !== wishlistItemId)
      )
    } else {
      setError(error.message || 'Error al eliminar el producto de la wishlist')
    }
  }

  return (
    <div className='p-4'>
      <h1 className='text-3xl font-bold mb-4'>Mi Wishlist</h1>
      {loading && <p>Cargando wishlist...</p>}
      {error && <p className='text-red-500'>{error}</p>}
      {!loading && wishlistItems.length === 0 ? (
        <p>No tienes productos en la wishlist.</p>
      ) : (
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
          {wishlistItems.map((item) => (
            <div key={item._id} className='relative'>
              <ProductCard product={item.product} />
              <button
                onClick={() => handleRemove(item._id)}
                className='absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded'
              >
                Quitar
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Wishlist
