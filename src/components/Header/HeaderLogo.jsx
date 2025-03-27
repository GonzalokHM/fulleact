import { useNavigate } from 'react-router-dom'
import { memo } from 'react'

function HeaderLogo() {
  const navigate = useNavigate()

  return (
    <div
      onClick={() => navigate('/')}
      className='flex items-center cursor-pointer'
    >
      <img src='/logo.png' alt='Logo' className='w-10 h-10 mr-1' />
      <span className='font-bold text-xl'>Comprador</span>
    </div>
  )
}

export default memo(HeaderLogo)
