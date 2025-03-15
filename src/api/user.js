import { API } from './api'

export const getUsers = () => API({ endpoint: '/users' })

export const updateUser = (userData) => {
  const formData = new FormData()
  Object.keys(userData).forEach((key) => {
    formData.append(key, userData[key])
  })

  return API({
    endpoint: '/users',
    method: 'PUT',
    body: formData,
    content_type: false
  })
}

export const updateUserRol = (userId, newRole) =>
  API({ endpoint: `/users/role/${userId}`, method: 'PUT', body: { newRole } })

export const deleteUser = (userId) =>
  API({ endpoint: `/users/${userId}`, method: 'DELETE' })
