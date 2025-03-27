import { useLocation } from 'react-router-dom'
import HeaderNav from './HeaderNav'
import SearchForm from './SearchForm'
import HeaderLogo from './HeaderLogo'
import useStore from '../store/useStore'
import HeaderNavMobil from './HeaderNavMobil'

function Header() {
  const menuOpen = useStore((state) => state.menuOpen)
  const toggleMenu = useStore((state) => state.toggleMenu)

  const location = useLocation()
  const showSearchInput = location.pathname !== '/vipSearch'

  return (
    <header className='bg-white shadow mb-4'>
      <div className='container py-2 flex items-center justify-between'>
        <HeaderLogo />
        <div className='flex items-center'>
          <div className='hidden md:block'>
            <HeaderNav />
          </div>
          <button
            onClick={toggleMenu}
            className='md:hidden focus:outline-none '
            aria-label='Toggle menu'
          >
            <svg
              className='w-6 h-6'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
              xmlns='http://www.w3.org/2000/svg'
            >
              {menuOpen ? (
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2'
                  d='M6 18L18 6M6 6l12 12'
                />
              ) : (
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2'
                  d='M4 6h16M4 12h16M4 18h16'
                />
              )}
            </svg>
          </button>
        </div>
        {showSearchInput && <SearchForm />}
      </div>
      <HeaderNavMobil
        open={menuOpen}
        onClose={() => useStore.getState().setMenuOpen(false)}
      />
    </header>
  )
}

export default Header
