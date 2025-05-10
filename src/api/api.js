import useStore from '../store/useStore'

const BASE_URL = 'https://backfulleact.onrender.com/api'

export const API = async ({
  endpoint,
  method = 'GET',
  body,
  content_type = true
}) => {
  const headers = {
    Authorization: `Bearer ${localStorage.getItem('token')}`
  }

  if (content_type && !(body instanceof FormData)) {
    headers['Content-Type'] = 'application/json'
    if (body) body = JSON.stringify(body)
  }

  try {
    const res = await fetch(BASE_URL + endpoint, {
      method,
      headers,
      body
    })
    const response = await res.json()

    if (res.status === 401) {
      useStore.getState().logout()
      // Redirige al login pasando un parámetro para indicar que la sesión ha caducado.
      window.location.href = '/login?sessionExpired=true'
      return { error: { message: 'Sesión caducada. Vuelve a loguearte.' } }
    }

    if (!res.ok) {
      return { error: response }
    }

    return { response }
  } catch (error) {
    return { error: { message: error.message } }
  }
}
