import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import useStore from '../store/useStore'
import { updateUserRol } from '../api/user'

function GetVip() {
  const { user, setUser } = useStore()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleActivateVip = async () => {
    setLoading(true)
    setError('')
    try {
      const { response, error } = await updateUserRol(user._id, true)
      if (error) {
        setError(
          error.message ||
            'Error al activar la suscripción VIP. Intenta de nuevo.'
        )
      } else {
        setUser(response)
        navigate('/profile')
      }
    } catch (err) {
      console.error(err)
      setError('Error al activar la suscripción VIP. Intenta de nuevo.')
    }
    setLoading(false)
  }

  return (
    <div className='contPading flexColCent'>
      <h1 className='mb-4 backgBlur2 '>Prueba VIP Gratis</h1>
      <p className='mb-4 text-center backgBlur'>
        ¡Disfruta de funciones exclusivas con la suscripción VIP por tiempo
        limitado! Al activarla, tendrás acceso a rutas exclusivas y beneficios
        especiales.
      </p>
      {error && <p className='errortext'>{error}</p>}
      <button onClick={handleActivateVip} disabled={loading} className='btnInf'>
        {loading ? 'Activando...' : 'Activar VIP'}
      </button>
    </div>
  )
}

export default GetVip
