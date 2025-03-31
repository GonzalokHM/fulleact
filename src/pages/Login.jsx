import { useActionState } from 'react'
import { useNavigate, Link, useLocation } from 'react-router-dom'
import useStore from '../store/useStore'
import useWishlistSync from '../hooks/useWishListSync'
import { loginUser } from '../api/auth'
import useAutoDismiss from '../hooks/useAutoDismiss'

function Login() {
  const localWishlist = useStore((state) => state.wishlist)
  const setUser = useStore((state) => state.setUser)
  const { syncWishlist } = useWishlistSync()
  const navigate = useNavigate()
  const { search } = useLocation()
  const params = new URLSearchParams(search)
  const sessionExpiredParam = params.get('sessionExpired')
  const showSessionExpired = useAutoDismiss(sessionExpiredParam ? 1 : 0, 5000)

  const [error, submitAction, pending] = useActionState(async (_, formData) => {
    const email = formData.get('email')
    const password = formData.get('password')
    const { response, error } = await loginUser({ email, password })

    if (error) return error.error || 'Error al iniciar sesión'

    localStorage.setItem('token', response.token)
    setUser(response.user)

    if (localWishlist.length > 0) {
      await syncWishlist(response.user._id)
    }

    navigate('/')
    return null
  }, null)

  return (
    <>
      {showSessionExpired && (
        <div className='backgBlurDimisDelet p-4 rounded mb-4 text-center'>
          Tu sesión ha caducado, por favor vuelve a loguearte.
        </div>
      )}
      <section className='container flexColCent'>
        <h1 className='backgBlur2 mt-3 mb-3'>Iniciar Sesión</h1>
        {error && <p className='errortext'>{error}</p>}
        <form action={submitAction} className='max-w-sm mx-auto'>
          <div className='mb-4 backgBlur'>
            <label className='block mb-1' htmlFor='email'>
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
          <div className='mb-4 backgBlur'>
            <label className='block mb-1' htmlFor='password'>
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
          <button type='submit' disabled={pending} className='w-full btnInf'>
            {pending ? 'Iniciando...' : 'Iniciar Sesión'}
          </button>
        </form>
        <p className='mt-4 text-center backgBlur p-2'>
          ¿No tienes cuenta?
          <Link to='/register' className='LoginRegisterLink'>
            Regístrate
          </Link>
        </p>
      </section>
    </>
  )
}

export default Login
