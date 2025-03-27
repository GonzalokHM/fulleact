// src/pages/Login.jsx
import { useRef } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import useAuth from '../hooks/useAuth'
import useStore from '../store/useStore'
import useWishlistSync from '../hooks/useWishListSync'

function Login() {
  const emailRef = useRef()
  const passwordRef = useRef()
  const { login, authLoading, authError } = useAuth()
  const localWishlist = useStore((state) => state.wishlist)
  const { syncWishlist } = useWishlistSync()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()

    const email = emailRef.current.value
    const password = passwordRef.current.value

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
      <h1 className='backgBlur2 mt-3 mb-3'>Iniciar Sesión</h1>
      {authError && <p className='errortext'>{authError}</p>}
      <form onSubmit={handleSubmit} className='max-w-sm mx-auto'>
        <div className='mb-4 backgBlur'>
          <label className='block mb-1' htmlFor='email'>
            Correo electrónico
          </label>
          <input
            ref={emailRef}
            type='email'
            id='email'
            className='imputBorder'
            required
          />
        </div>
        <div className='mb-4 backgBlur'>
          <label className='block mb-1' htmlFor='password'>
            Contraseña
          </label>
          <input
            ref={passwordRef}
            type='password'
            id='password'
            className='imputBorder'
            required
          />
        </div>
        <button type='submit' disabled={authLoading} className='w-full btnInf'>
          {authLoading ? 'Iniciando...' : 'Iniciar Sesión'}
        </button>
      </form>
      <p className='mt-4 text-center backgBlur p-2'>
        ¿No tienes cuenta?
        <Link to='/register' className='text-blue-500'>
          Regístrate
        </Link>
      </p>
    </div>
  )
}

export default Login
