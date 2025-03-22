// src/components/HeaderNav.jsx
import { Link } from 'react-router-dom'

function HeaderNav({ isMobile = false, onLinkClick }) {
  const commonClasses = 'hover:text-blue-500'
  if (isMobile) {
    return (
      <nav className='bg-white shadow'>
        <div className='container mx-auto px-4 py-2 flex items-center flex-col space-y-2'>
          <Link to='/' className={commonClasses} onClick={onLinkClick}>
            Home
          </Link>
          <Link to='/wishlist' className={commonClasses} onClick={onLinkClick}>
            Wishlist
          </Link>
          <Link to='/profile' className={commonClasses} onClick={onLinkClick}>
            Profile
          </Link>
          <Link to='/compare' className={commonClasses} onClick={onLinkClick}>
            Compare
          </Link>
        </div>
      </nav>
    )
  }
  return (
    <nav className='hidden md:flex items-center space-x-4'>
      <Link to='/wishlist' className={commonClasses}>
        Wishlist
      </Link>
      <Link to='/profile' className={commonClasses}>
        Profile
      </Link>
      <Link to='/compare' className={commonClasses}>
        Compare
      </Link>
    </nav>
  )
}

export default HeaderNav
