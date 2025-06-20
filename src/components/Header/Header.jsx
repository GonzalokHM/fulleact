import HeaderNav from './HeaderNav'
import SearchForm from './SearchForm'
import HeaderLogo from './HeaderLogo'
import useStore from '../../store/useStore'
import HeaderNavMobil from './HeaderNavMobil'
import CategoriesBar from './CategoryBar'
import { memo } from 'react'

function Header({ showSearchInput }) {
  const menuOpen = useStore((state) => state.menuOpen)
  const toggleMenu = useStore((state) => state.toggleMenu)
  const setMenuOpen = useStore((state) => state.setMenuOpen)
  const menuId = 'mobile-menu'

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
            aria-expanded={menuOpen}
            aria-controls={menuId}
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
      <CategoriesBar />
      <HeaderNavMobil
        id={menuId}
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
      />
    </header>
  )
}

export default memo(Header)
