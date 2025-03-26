import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import useAuth from '../hooks/useAuth'
import useStore from '../store/useStore'
import useWishlistSync from '../hooks/useWishListSync'

function Register() {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { register, authLoading, authError } = useAuth()
  const { wishlist: localWishlist } = useStore()
  const { syncWishlist } = useWishlistSync()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    const res = await register({ username, email, password })
    if (res) {
      if (localWishlist.length > 0) {
        await syncWishlist(res.user._id)
      }
      navigate('/')
    }
  }

  return (
    <div className='container flexColCent'>
      <h1 className='text-3xl font-bold mb-4'>Regístrate</h1>
      {authError && <p className='text-red-500 mb-4'>{authError}</p>}
      <form onSubmit={handleSubmit} className='max-w-sm mx-auto'>
        <div className='mb-4'>
          <label htmlFor='username' className='block mb-1'>
            Nombre de usuario
          </label>
          <input
            type='text'
            id='username'
            className='imputBorder'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className='mb-4'>
          <label htmlFor='email' className='block mb-1'>
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
          <label htmlFor='password' className='block mb-1'>
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
        <button type='submit' disabled={authLoading} className='btnRegister'>
          {authLoading ? 'Registrando...' : 'Registrarse'}
        </button>
      </form>
      <p className='mt-4 text-center'>
        ¿Ya tienes cuenta?{' '}
        <Link to='/login' className='text-blue-500'>
          Inicia Sesión
        </Link>
      </p>
    </div>
  )
}

export default Register
