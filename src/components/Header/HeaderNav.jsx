// src/components/HeaderNav.jsx
import { NavLink } from 'react-router-dom'

function HeaderNav({ isMobile = false, onLinkClick, id }) {
  if (isMobile) {
    return (
      <nav id={id} className='bg-white shadow'>
        <div className='container py-2 flex items-center flex-col space-y-2'>
          <NavLink
            to='/'
            className={({ isActive }) =>
              isActive ? 'hoverH activeNav' : 'hoverH'
            }
            onClick={onLinkClick}
          >
            Home
          </NavLink>
          <NavLink
            to='/wishlist'
            className={({ isActive }) =>
              isActive ? 'hoverH activeNav' : 'hoverH'
            }
            onClick={onLinkClick}
          >
            Wishlist
          </NavLink>
          <NavLink
            to='/profile'
            className={({ isActive }) =>
              isActive ? 'hoverH activeNav' : 'hoverH'
            }
            onClick={onLinkClick}
          >
            Profile
          </NavLink>
          <NavLink
            to='/compare'
            className={({ isActive }) =>
              isActive ? 'hoverH activeNav' : 'hoverH'
            }
            onClick={onLinkClick}
          >
            Compare
          </NavLink>
        </div>
      </nav>
    )
  }
  return (
    <nav className='hidden md:flex items-center space-x-4'>
      <NavLink
        to='/wishlist'
        className={({ isActive }) => (isActive ? 'hoverH activeNav' : 'hoverH')}
      >
        Wishlist
      </NavLink>
      <NavLink
        to='/profile'
        className={({ isActive }) => (isActive ? 'hoverH activeNav' : 'hoverH')}
      >
        Profile
      </NavLink>
      <NavLink
        to='/compare'
        className={({ isActive }) => (isActive ? 'hoverH activeNav' : 'hoverH')}
      >
        Compare
      </NavLink>
    </nav>
  )
}

export default HeaderNav
