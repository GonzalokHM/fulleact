import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import useStore from '../store/useStore'

function GetVip() {
  const { user, setUser } = useStore()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleActivateVip = async () => {
    try {
      setLoading(true)
      setError('')
      const response = await axios.put(`/api/users/role/${user._id}`, {
        newRole: true
      })
      setUser(response.data)
      setLoading(false)
      navigate('/profile')
    } catch (err) {
      setLoading(false)
      setError('Error al activar la suscripción VIP. Intenta de nuevo.', err)
    }
  }

  return (
    <div className='p-4 flex flex-col items-center'>
      <h1 className='text-3xl font-bold mb-4'>Prueba VIP Gratis</h1>
      <p className='mb-4 text-center'>
        ¡Disfruta de funciones exclusivas con la suscripción VIP por tiempo
        limitado! Al activarla, tendrás acceso a rutas exclusivas y beneficios
        especiales.
      </p>
      {error && <p className='text-red-500 mb-4'>{error}</p>}
      <button
        onClick={handleActivateVip}
        disabled={loading}
        className='px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600'
      >
        {loading ? 'Activando...' : 'Activar VIP'}
      </button>
    </div>
  )
}

export default GetVip
