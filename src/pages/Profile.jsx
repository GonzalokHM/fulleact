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
    <div className='container contPading flexColCent max-w-md'>
      <div className='flex items-center mb-6'>
        <h1>Mi Perfil</h1>
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
          <span className='viplogo '>Cuenta VIP activada</span>
        </div>
      )}
      {error && <p className='errortext'>{error}</p>}
      {success && <p className='succestext'>{success}</p>}
      <form onSubmit={handleSubmit} className='space-y-6'>
        <div>
          <label htmlFor='username' className='profileLabel'>
            Nombre de usuario
          </label>
          <input
            type='text'
            id='username'
            className='profileInput'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor='email' className='profileLabel'>
            Correo electrónico
          </label>
          <input
            type='email'
            id='email'
            className='profileInput'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className='justify-items-center'>
          <label htmlFor='avatar' className='profileLabel'>
            Avatar (imagen)
          </label>
          <div className='avatarPrev'>
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
        <button type='submit' disabled={loading} className='w-full btnInf'>
          {loading ? 'Actualizando...' : 'Actualizar Perfil'}
        </button>
      </form>
      <button onClick={handleLogout} className='btnLogout'>
        Cerrar sesión
      </button>
    </div>
  )
}

export default Profile
