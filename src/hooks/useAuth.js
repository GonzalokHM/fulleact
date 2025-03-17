// src/hooks/useAuth.js
import { useState } from 'react'
import { loginUser, registerUser } from '../api/auth'
import useStore from '../store/useStore'

const useAuth = () => {
  const { setUser } = useStore()
  const [authLoading, setAuthLoading] = useState(false)
  const [authError, setAuthError] = useState(null)

  const login = async (credentials) => {
    setAuthLoading(true)
    setAuthError(null)
    try {
      const { response, error } = await loginUser(credentials)
      if (error) {
        setAuthError(error.message || 'Error during login')
        setAuthLoading(false)
        return false
      } else {
        localStorage.setItem('token', response.token)
        setUser(response.user)
        setAuthLoading(false)
        return response
      }
    } catch (err) {
      setAuthError(err.message || 'Error during login')
      setAuthLoading(false)
      return false
    }
  }

  const register = async (userData) => {
    setAuthLoading(true)
    setAuthError(null)
    try {
      const { error: registerError } = await registerUser(userData)
      if (registerError) {
        setAuthError(registerError.message || 'Error during registration')
        setAuthLoading(false)
        return false
      }
      const loginResponse = await login({
        email: userData.email,
        password: userData.password
      })
      setAuthLoading(false)
      return loginResponse
    } catch (err) {
      setAuthError(err.message || 'Error during registration')
      setAuthLoading(false)
      return false
    }
  }

  return {
    login,
    register,
    authLoading,
    authError
  }
}

export default useAuth
