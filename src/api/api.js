const BASE_URL = 'http://localhost:4001/api'

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

    if (!res.ok) {
      return { error: response }
    }

    return { response }
  } catch (error) {
    return { error: { message: error.message } }
  }
}
