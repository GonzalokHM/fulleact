import { API } from './api'

export const getCategories = () => API({ endpoint: '/categories' })

export const getCategoryByName = (nombre) =>
  API({ endpoint: `/categories/nombre/${nombre}` })

export const vipSearchMoreByCategory = (category) =>
  API({
    endpoint: `/products/vipSearch?more=true&category=${encodeURIComponent(
      category
    )}`
  })
