import { getWishlist, addToWishlist, removeFromWishlist } from '../api/wishList'
import useStore from '../store/useStore'

const useWishlistSync = () => {
  const { wishlist: localWishlist, setWishlist } = useStore()

  const syncWishlist = async (userId) => {
    if (localWishlist.length === 0) return

    const { response: backendWishlist, error: backendError } =
      await getWishlist(userId)
    if (backendError) {
      console.error('Error al obtener la wishlist del backend', backendError)
      return
    }
    const backendIds = backendWishlist.map((item) => item.producto._id)

    if (backendIds.length > 0) {
      const merge = window.confirm(
        'Ya tienes productos en tu wishlist guardada. ¿Quieres fusionarla con la wishlist local? (Aceptar = fusionar / Cancelar = sobrescribir)'
      )
      if (merge) {
        for (const prodId of localWishlist) {
          if (!backendIds.includes(prodId)) {
            const { error } = await addToWishlist(userId, prodId)
            if (error) console.error(error)
          }
        }
      } else {
        for (const item of backendWishlist) {
          await removeFromWishlist(item.producto._id)
        }
        for (const prodId of localWishlist) {
          const { error } = await addToWishlist(userId, prodId)
          if (error) console.error(error)
        }
      }
    } else {
      for (const prodId of localWishlist) {
        const { error } = await addToWishlist(userId, prodId)
        if (error) console.error(error)
      }
    }
    setWishlist([])
  }

  return { syncWishlist }
}

export default useWishlistSync
