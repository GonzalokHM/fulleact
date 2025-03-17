import React, { useState, useEffect } from 'react'
import useStore from '../store/useStore'
import { updateUser } from '../api/user'

function Profile() {
  const { user, setUser } = useStore()
  const [username, setUsername] = useState(user?.username || '')
  const [email, setEmail] = useState(user?.email || '')
  const [avatarFile, setAvatarFile] = useState(null)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (user) {
      setUsername(user.username)
      setEmail(user.email)
    }
  }, [user])

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
        setUser(response)
      }
    } catch (err) {
      setError('Error al actualizar el perfil')
      console.error(err)
    }
    setLoading(false)
  }

  return (
    <div className='container mx-auto p-4 max-w-md'>
      <h1 className='text-3xl font-bold mb-4'>Mi Perfil</h1>
      {error && <p className='text-red-500 mb-4'>{error}</p>}
      {success && <p className='text-green-500 mb-4'>{success}</p>}
      <form onSubmit={handleSubmit} className='space-y-4'>
        <div>
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
        <div>
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
        <div>
          <label htmlFor='avatar' className='block mb-1'>
            Avatar (imagen)
          </label>
          <input
            type='file'
            id='avatar'
            className='w-full'
            accept='image/*'
            onChange={(e) => setAvatarFile(e.target.files[0])}
          />
        </div>
        <button
          type='submit'
          disabled={loading}
          className='w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600'
        >
          {loading ? 'Actualizando...' : 'Actualizar Perfil'}
        </button>
      </form>
    </div>
  )
}

export default Profile
