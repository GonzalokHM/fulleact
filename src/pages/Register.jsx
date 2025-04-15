import { useNavigate, Link } from 'react-router-dom'
import useStore from '../store/useStore'
import useWishlistSync from '../hooks/useWishListSync'
import { loginUser, registerUser } from '../api/auth'
import { useActionState } from 'react'

function Register() {
  const localWishlist = useStore((state) => state.wishlist)
  const setUser = useStore((state) => state.setUser)
  const { syncWishlist } = useWishlistSync()
  const navigate = useNavigate()

  const [error, submitAction, pending] = useActionState(async (_, formData) => {
    const username = formData.get('username')
    const email = formData.get('email')
    const password = formData.get('password')

    const reg = await registerUser({ username, email, password })
    if (reg.error) return reg.error.error || 'Error al registrarse'

    const login = await loginUser({ email, password })
    if (login.error) return login.error.error || 'Error al iniciar sesión'

    localStorage.setItem('token', login.response.token)
    setUser(login.response.user)

    if (localWishlist.length > 0) {
      await syncWishlist(login.response.user._id)
    }

    navigate('/')
    return null
  }, null)

  return (
    <section className='container flexColCent'>
      <h1 className='text-3xl font-bold mb-4 mt-3 px-2'>Regístrate</h1>
      {error && <p className='errortext'>{error}</p>}
      <form action={submitAction} className='max-w-sm mx-auto'>
        <div className='mb-4'>
          <label htmlFor='username' className='block mb-1'>
            Nombre de usuario
          </label>
          <input
            type='text'
            name='username'
            id='username'
            autoComplete='username'
            className='imputBorder'
            required
          />
        </div>
        <div className='mb-4'>
          <label htmlFor='email' className='block mb-1'>
            Correo electrónico
          </label>
          <input
            type='email'
            name='email'
            id='email'
            autoComplete='email'
            className='imputBorder'
            required
          />
        </div>
        <div className='mb-4'>
          <label htmlFor='password' className='block mb-1'>
            Contraseña
          </label>
          <input
            type='password'
            name='password'
            id='password'
            autoComplete='current-password'
            className='imputBorder'
            required
          />
        </div>
        <button type='submit' disabled={pending} className='btnRegister'>
          {pending ? 'Registrando...' : 'Registrarse'}
        </button>
      </form>
      <p className='mt-4 text-center backgBlur px-2'>
        ¿Ya tienes cuenta?{' '}
        <Link to='/login' className='LoginRegisterLink '>
          Inicia Sesión
        </Link>
      </p>
    </section>
  )
}

export default Register
