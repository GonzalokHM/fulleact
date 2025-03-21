import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import useAuth from '../hooks/useAuth'

function Register() {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { register, authLoading, authError } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    const res = await register({ username, email, password })
    if (res) {
      navigate('/')
    }
  }

  return (
    <div className='container mx-auto p-4'>
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
            className='w-full border rounded px-2 py-1'
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
            className='w-full border rounded px-2 py-1'
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
            className='w-full border rounded px-2 py-1'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button
          type='submit'
          disabled={authLoading}
          className='w-full bg-green-500 text-white py-2 rounded hover:bg-green-600'
        >
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
