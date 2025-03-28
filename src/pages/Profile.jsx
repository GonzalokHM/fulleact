import { useState, useEffect, useActionState } from 'react'
import useStore from '../store/useStore'
import { updateUser } from '../api/user'
import { useNavigate } from 'react-router-dom'
import { useFormStatus } from 'react-dom'

function SubmitButton() {
  const { pending } = useFormStatus()
  return (
    <button type='submit' disabled={pending} className='w-full btnInf'>
      {pending ? 'Actualizando...' : 'Actualizar Perfil'}
    </button>
  )
}

function Profile() {
  const { user, setUser, logout } = useStore()
  const [username, setUsername] = useState(user?.username || '')
  const [email, setEmail] = useState(user?.email || '')
  const [avatarFile, setAvatarFile] = useState(null)
  const [avatarPreview, setAvatarPreview] = useState(user?.avatar || null)
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

  const [error, submitAction, pending] = useActionState(async (_, formData) => {
    const formUsername = formData.get('username')?.trim()
    const formEmail = formData.get('email')?.trim()

    if (!formUsername || !formEmail) {
      return 'Nombre y correo son obligatorios'
    }

    const formPayload = new FormData()
    formPayload.append('username', formUsername)
    formPayload.append('email', formEmail)
    if (avatarFile) formPayload.append('avatar', avatarFile)

    const { response, error } = await updateUser(formPayload)
    if (error) return error.message || 'Error al actualizar el perfil'

    setUser(response)
    return null
  }, null)

  const handleAvatarChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setAvatarFile(file)
      const previewUrl = URL.createObjectURL(file)
      setAvatarPreview(previewUrl)
    }
  }

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <div className='container contPading flexColCent max-w-md'>
      <header className='flex items-center mb-6'>
        <h1 className='backgBlur'>Mi Perfil</h1>
        {user?.avatar && (
          <img
            src={user.avatar}
            alt='Avatar de usuario'
            width={124}
            height={124}
            className='w-16 h-16 rounded-full object-cover m-0.5'
          />
        )}
      </header>
      {user?.vip && (
        <div className='mb-4'>
          <span className='viplogo '>Cuenta VIP activada</span>
        </div>
      )}
      {error && <p className='errortext'>{error}</p>}
      {/* {success && <p className='succestext'>{success}</p>} */}
      <form
        action={submitAction}
        className='space-y-6'
        aria-label='Formulario de perfil'
      >
        <fieldset className='space-y-4' disabled={pending}>
          <div className='flexColCent'>
            <label htmlFor='username' className='profileLabel backgBlur'>
              Nombre de usuario
            </label>
            <input
              type='text'
              name='username'
              id='username'
              autoComplete='username'
              defaultValue={username}
              className='profileInput backgBlur3'
              required
            />
          </div>
          <div className='flexColCent'>
            <label htmlFor='email' className='profileLabel backgBlur'>
              Correo electrónico
            </label>
            <input
              type='email'
              name='email'
              id='email'
              autoComplete='email'
              defaultValue={email}
              className='profileInput backgBlur3'
              required
            />
          </div>
          <div className='justify-items-center'>
            <label htmlFor='avatar' className='profileLabel backgBlur'>
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
                <span className='text-gray-500 text-center font-semibold px-2'>
                  Selecciona una imagen
                </span>
              )}
              <input
                type='file'
                name='avatar'
                id='avatar'
                className='absolute inset-0 opacity-0 cursor-pointer'
                accept='image/*'
                onChange={handleAvatarChange}
              />
            </div>
            <p className='text-sm text-gray-600 mt-2 backgBlur2'>
              Haz clic en el área para seleccionar tu avatar.
            </p>
          </div>
        </fieldset>
        <SubmitButton />
      </form>
      <button onClick={handleLogout} className='btnLogout'>
        Cerrar sesión
      </button>
    </div>
  )
}

export default Profile
