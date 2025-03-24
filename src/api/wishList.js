import { API } from './api'

export const getWishlist = (userId) => API({ endpoint: `/wishlist/${userId}` })

export const addToWishlist = (usuario, product_id) =>
  API({ endpoint: '/wishlist', method: 'POST', body: { usuario, product_id } })

export const removeFromWishlist = (product_id) =>
  API({ endpoint: `/wishlist/${product_id}`, method: 'DELETE' })
