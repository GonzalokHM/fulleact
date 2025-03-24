import { useState, useEffect } from 'react'
import useStore from '../store/useStore'
import { updateUser } from '../api/user'
import { useNavigate } from 'react-router-dom'

function Profile() {
  const { user, setUser, logout } = useStore()
  const [username, setUsername] = useState(user?.username || '')
  const [email, setEmail] = useState(user?.email || '')
  const [avatarFile, setAvatarFile] = useState(null)
  const [avatarPreview, setAvatarPreview] = useState(user?.avatar || null)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    if (user) {
      setUsername(user.username)
      setEmail(user.email)
      setAvatarPreview(user.avatar)
    }
  }, [user])

  useEffect(() => {
    return () => {
      if (avatarPreview && avatarPreview.startsWith('blob:')) {
        URL.revokeObjectURL(avatarPreview)
      }
    }
  }, [avatarPreview])

  const handleAvatarChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setAvatarFile(file)
      setAvatarPreview(URL.createObjectURL(file))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setSuccess('')

    const formData = new FormData()
    formData.append('username', username)
    formData.append('email', email)
    if (avatarFile) {
      formData.append('avatar', avatarFile)
    }
    try {
      const { response, error } = await updateUser(formData)
      if (error) {
        setError(error.message || 'Error al actualizar el perfil')
      } else {
        setSuccess('Perfil actualizado exitosamente')
        console.log(response)
        setUser(response)
      }
    } catch (err) {
      setError('Error al actualizar el perfil')
      console.error(err)
    }
    setLoading(false)
  }

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <div className='container flex flex-col items-center text-center mx-auto p-4 max-w-md'>
      <div className='flex items-center mb-6'>
        <h1 className='text-3xl font-bold'>Mi Perfil</h1>
        {user && user.avatar && (
          <img
            src={user.avatar}
            alt='Avatar de usuario'
            className='w-16 h-16 rounded-full object-cover m-0.5'
          />
        )}
      </div>
      {user && user.vip && (
        <div className='mb-4'>
          <span className='bg-yellow-500 text-black px-3 py-1 rounded text-sm font-bold'>
            Cuenta VIP activada
          </span>
        </div>
      )}
      {error && <p className='text-red-500 mb-4'>{error}</p>}
      {success && <p className='text-green-500 mb-4'>{success}</p>}
      <form onSubmit={handleSubmit} className='space-y-6'>
        <div>
          <label htmlFor='username' className='block mb-2 font-medium'>
            Nombre de usuario
          </label>
          <input
            type='text'
            id='username'
            className='w-full border rounded px-3 py-2 text-center focus:outline-none focus:ring focus:border-blue-300'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor='email' className='block mb-2 font-medium'>
            Correo electrónico
          </label>
          <input
            type='email'
            id='email'
            className='w-full border rounded  px-3 py-2 text-center focus:outline-none focus:ring focus:border-blue-300'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className='justify-items-center'>
          <label htmlFor='avatar' className='block mb-2 font-medium'>
            Avatar (imagen)
          </label>
          <div className='relative w-32 h-32 border-2 border-dashed rounded-full overflow-hidden flex items-center justify-center cursor-pointer hover:border-blue-500'>
            {avatarPreview ? (
              <img
                src={avatarPreview}
                alt='Vista previa del avatar'
                className='w-full h-full object-cover'
              />
            ) : (
              <span className='text-gray-500 text-center px-2'>
                Selecciona una imagen
              </span>
            )}
            <input
              type='file'
              id='avatar'
              className='absolute inset-0 opacity-0 cursor-pointer'
              accept='image/*'
              onChange={handleAvatarChange}
            />
          </div>
          <p className='text-sm text-gray-600 mt-2'>
            Haz clic en el área para seleccionar tu avatar.
          </p>
        </div>
        <button
          type='submit'
          disabled={loading}
          className='w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600'
        >
          {loading ? 'Actualizando...' : 'Actualizar Perfil'}
        </button>
      </form>
      <button
        onClick={handleLogout}
        className='bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded mt-2'
      >
        Cerrar sesión
      </button>
    </div>
  )
}

export default Profile
