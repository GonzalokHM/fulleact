import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import HeaderNav from './HeaderNav'
import SearchForm from './SearchForm'

function Header() {
  const location = useLocation()
  const [menuOpen, setMenuOpen] = useState(false)

  const showSearchInput = location.pathname !== '/vipSearch'

  return (
    <header className='bg-white shadow mb-4'>
      <div className='container mx-auto py-2 flex items-center justify-between'>
        <Link to='/' className='flex items-center '>
          <img src='/logo.png' alt='Logo' className='w-10 h-10 mr-1' />
          <span className='font-bold text-xl'>Comprador</span>
        </Link>
        <div className='flex items-center'>
          <div className='hidden md:block'>
            <HeaderNav />
          </div>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
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

      {menuOpen && (
        <HeaderNav isMobile={true} onLinkClick={() => setMenuOpen(false)} />
      )}
    </header>
  )
}

export default Header
