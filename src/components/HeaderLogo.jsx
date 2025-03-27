import { Link } from 'react-router-dom'
import { memo } from 'react'

function HeaderLogo() {
  return (
    <Link to='/' className='flex items-center'>
      <img src='/logo.png' alt='Logo' className='w-10 h-10 mr-1' />
      <span className='font-bold text-xl'>Comprador</span>
    </Link>
  )
}

export default memo(HeaderLogo)
