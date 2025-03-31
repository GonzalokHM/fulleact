import { useNavigate } from 'react-router-dom'
import { memo } from 'react'

function HeaderLogo() {
  const navigate = useNavigate()

  return (
    <div
      onClick={() => navigate('/')}
      className='flex items-center cursor-pointer'
    >
      <img src='/logo.webp' alt='Logo' className='w-[40px] h-[40px] ' />
      <span className='font-bold hidden lg:inline'>Comprador</span>
    </div>
  )
}

export default memo(HeaderLogo)
