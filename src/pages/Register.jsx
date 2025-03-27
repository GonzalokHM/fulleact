import { useNavigate, Link } from 'react-router-dom'
import useAuth from '../hooks/useAuth'
import useStore from '../store/useStore'
import useWishlistSync from '../hooks/useWishListSync'
import { useRef } from 'react'

function Register() {
  const usernameRef = useRef()
  const emailRef = useRef()
  const passwordRef = useRef()
  const { register, authLoading, authError } = useAuth()
  const localWishlist = useStore((state) => state.wishlist)
  const { syncWishlist } = useWishlistSync()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()

    const username = usernameRef.current.value
    const email = emailRef.current.value
    const password = passwordRef.current.value

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
      <h1 className='text-3xl font-bold mb-4 backgBlur3 mt-3 px-2'>
        Regístrate
      </h1>
      {authError && <p className='errortext'>{authError}</p>}
      <form onSubmit={handleSubmit} className='max-w-sm mx-auto'>
        <div className='mb-4 backgBlur'>
          <label htmlFor='username' className='block mb-1'>
            Nombre de usuario
          </label>
          <input
            ref={usernameRef}
            type='text'
            id='username'
            className='imputBorder'
            required
          />
        </div>
        <div className='mb-4 backgBlur'>
          <label htmlFor='email' className='block mb-1'>
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
          <label htmlFor='password' className='block mb-1'>
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
        <button type='submit' disabled={authLoading} className='btnRegister'>
          {authLoading ? 'Registrando...' : 'Registrarse'}
        </button>
      </form>
      <p className='mt-4 text-center backgBlur px-2'>
        ¿Ya tienes cuenta?{' '}
        <Link to='/login' className='text-blue-500 '>
          Inicia Sesión
        </Link>
      </p>
    </div>
  )
}

export default Register
