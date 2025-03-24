import { useEffect, useState } from 'react'
import useStore from '../store/useStore'
import ProductCard from '../components/ProductCard'
import { getWishlist, removeFromWishlist } from '../api/wishList'

function Wishlist() {
  const { user, setWishlist } = useStore()
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
        const ids = response.map((item) => item.producto._id)
        setWishlist(ids)
      }
      setLoading(false)
    }

    fetchWishlist()
  }, [user, setWishlist])

  const handleRemove = async (productId) => {
    const { response, error } = await removeFromWishlist(productId)
    if (response) {
      // Usamos función callback para actualizar el estado sin problemas
      setWishlistItems((prev) =>
        prev.filter((item) => item.producto._id !== productId)
      )
      setWishlist((prev) => prev.filter((id) => id !== productId))
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
              <ProductCard product={item.producto} showWishlistToggle={false} />
              <button
                onClick={() => handleRemove(item.producto._id)}
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
