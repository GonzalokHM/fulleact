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
      setWishlistItems((prev) =>
        prev.filter((item) => item.producto._id !== productId)
      )
      setWishlist((prev) => prev.filter((id) => id !== productId))
    } else {
      setError(error.message || 'Error al eliminar el producto de la wishlist')
    }
  }

  return (
    <div className='contPading'>
      <h2 className='backgBlur2 px-1.5 w-fit'>Mi Wishlist</h2>
      {loading && <p>Cargando wishlist...</p>}
      {error && <p className='errortext'>{error}</p>}
      {!loading && wishlistItems.length === 0 ? (
        <p>No tienes productos en la wishlist.</p>
      ) : (
        <div className='gridRes'>
          {wishlistItems.map((item) => (
            <div key={item._id} className='relative '>
              <ProductCard product={item.producto} showWishlistToggle={false} />
              <button
                onClick={() => handleRemove(item.producto._id)}
                className='btnRemoveWish'
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
