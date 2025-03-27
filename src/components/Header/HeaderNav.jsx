// src/components/HeaderNav.jsx
import { Link } from 'react-router-dom'

function HeaderNav({ isMobile = false, onLinkClick }) {
  if (isMobile) {
    return (
      <nav className='bg-white shadow'>
        <div className='container py-2 flex items-center flex-col space-y-2'>
          <Link to='/' className='hoverH' onClick={onLinkClick}>
            Home
          </Link>
          <Link to='/wishlist' className='hoverH' onClick={onLinkClick}>
            Wishlist
          </Link>
          <Link to='/profile' className='hoverH' onClick={onLinkClick}>
            Profile
          </Link>
          <Link to='/compare' className='hoverH' onClick={onLinkClick}>
            Compare
          </Link>
        </div>
      </nav>
    )
  }
  return (
    <nav className='hidden md:flex items-center space-x-4'>
      <Link to='/wishlist' className='hoverH'>
        Wishlist
      </Link>
      <Link to='/profile' className='hoverH'>
        Profile
      </Link>
      <Link to='/compare' className='hoverH'>
        Compare
      </Link>
    </nav>
  )
}

export default HeaderNav
