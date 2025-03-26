// src/pages/Login.jsx
import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import useAuth from '../hooks/useAuth'
import useStore from '../store/useStore'
import useWishlistSync from '../hooks/useWishListSync'

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { login, authLoading, authError } = useAuth()
  const { wishlist: localWishlist } = useStore()
  const { syncWishlist } = useWishlistSync()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    const res = await login({ email, password })
    if (res) {
      if (localWishlist.length > 0) {
        await syncWishlist(res.user._id)
      }
      navigate('/')
    }
  }

  return (
    <div className='container flexColCent'>
      <h1>Iniciar Sesión</h1>
      {authError && <p className='errortext'>{authError}</p>}
      <form onSubmit={handleSubmit} className='max-w-sm mx-auto'>
        <div className='mb-4'>
          <label className='block mb-1' htmlFor='email'>
            Correo electrónico
          </label>
          <input
            type='email'
            id='email'
            className='imputBorder'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className='mb-4'>
          <label className='block mb-1' htmlFor='password'>
            Contraseña
          </label>
          <input
            type='password'
            id='password'
            className='imputBorder'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type='submit' disabled={authLoading} className='w-full btnInf'>
          {authLoading ? 'Iniciando...' : 'Iniciar Sesión'}
        </button>
      </form>
      <p className='mt-4 text-center'>
        ¿No tienes cuenta?
        <Link to='/register' className='text-blue-500'>
          Regístrate
        </Link>
      </p>
    </div>
  )
}

export default Login
