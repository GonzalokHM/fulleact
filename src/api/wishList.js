import { API } from './api'

export const getWishlist = (userId) => API({ endpoint: `/wishlist/${userId}` })

export const addToWishlist = (usuario, ASIN) =>
  API({ endpoint: '/wishlist', method: 'POST', body: { usuario, ASIN } })

export const removeFromWishlist = (wishlistItemId) =>
  API({ endpoint: `/wishlist/${wishlistItemId}`, method: 'DELETE' })
