import useStore from '../store/useStore'

function Wishlist() {
  const { wishlist, toggleWishlist } = useStore()

  return (
    <div className='p-4'>
      <h1 className='text-3xl font-bold'>Mi Wishlist</h1>
      {wishlist.length === 0 ? (
        <p>No tienes productos en la wishlist.</p>
      ) : (
        <ul>
          {wishlist.map((productId) => (
            <li key={productId} className='p-2 border-b'>
              Producto ID: {productId}
              <button
                onClick={() => toggleWishlist(productId)}
                className='ml-2 text-red-500'
              >
                Quitar
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default Wishlist
