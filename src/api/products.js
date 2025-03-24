// src/api/productApi.js
import { API } from './api'

export const getProducts = () => API({ endpoint: '/products' })

export const getProductById = (id) => API({ endpoint: `/products/id/${id}` })

export const filterProducts = (params) => {
  const queryString = new URLSearchParams(params).toString()
  return API({ endpoint: `/products/filter?${queryString}` })
}

export const getUniqueProductPerCategory = () =>
  API({ endpoint: '/products/unique' })

export const getTopSellingPerCategory = () => API({ endpoint: '/products/top' })

export const getProductByASIN = (asin) =>
  API({ endpoint: `/products/asin/${asin}` })

export const vipSearch = (name) =>
  API({ endpoint: `/products/vipSearch?name=${encodeURIComponent(name)}` })
