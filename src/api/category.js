import { API } from './api'

export const getCategories = () => API({ endpoint: '/categories' })

export const getCategoryByName = (nombre) =>
  API({ endpoint: `/categories/nombre/${nombre}` })
