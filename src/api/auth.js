import { API } from './api'

export const registerUser = (userData) =>
  API({ endpoint: '/auth/register', method: 'POST', body: userData })

export const loginUser = (credentials) =>
  API({ endpoint: '/auth/login', method: 'POST', body: credentials })
