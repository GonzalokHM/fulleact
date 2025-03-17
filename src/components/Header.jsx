import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { filterProducts } from '../api/products'

function Header() {
  const location = useLocation()
  const navigate = useNavigate()
  const [searchTerm, setSearchTerm] = useState('')
  const [filterType, setFilterType] = useState('name')
  const [menuOpen, setMenuOpen] = useState(false)

  const handleSearch = async (e) => {
    e.preventDefault()
    if (!searchTerm.trim()) return
    try {
      let searchParams =
        filterType === 'category'
          ? { categoriaName: searchTerm }
          : { name: searchTerm }
      const { response, error } = await filterProducts(searchParams)
      if (error) {
        console.error(error)
      } else {
        if (response.length > 0) {
          navigate(`/search-results?name=${encodeURIComponent(searchTerm)}`)
        } else {
          navigate(`/vipSearch?name=${encodeURIComponent(searchTerm)}`)
        }
      }
    } catch (err) {
      console.error(err)
    }
  }
  const showSearchInput = location.pathname !== '/vipSearch'

  return (
    <header className='bg-white shadow mb-4'>
      <div className='container mx-auto px-4 py-4 flex items-center justify-between'>
        <Link to='/' className='flex items-center'>
          <img src='/logo.png' alt='Logo' className='w-10 h-10 mr-2' />
          <span className='font-bold text-xl'>Comparador</span>
        </Link>

        {/* hamburguer */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className='md:hidden focus:outline-none'
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

        <nav className='hidden md:flex items-center space-x-4'>
          <Link to='/' className='hover:text-blue-500'>
            Home
          </Link>
          <Link to='/wishlist' className='hover:text-blue-500'>
            Wishlist
          </Link>
          <Link to='/profile' className='hover:text-blue-500'>
            Profile
          </Link>
          <Link to='/compare' className='hover:text-blue-500'>
            Compare
          </Link>
        </nav>

        {showSearchInput && (
          <form
            onSubmit={handleSearch}
            className='flex flex-col md:flex-row items-start md:items-center space-y-2 md:space-y-0 md:space-x-2'
          >
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className='border rounded px-2 py-1 mr-2 text-sm focus:outline-none'
            >
              <option value='name'>Nombre</option>
              <option value='category'>Categoría</option>
            </select>
            <input
              type='text'
              placeholder='Buscar producto...'
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className='border rounded px-2 py-1 text-sm w-full md:w-auto'
            />
            <button
              type='submit'
              className='ml-2 bg-blue-500 text-white px-3 py-1 rounded text-sm'
            >
              Buscar
            </button>
          </form>
        )}
      </div>

      {menuOpen && (
        <nav className='md:hidden bg-white shadow'>
          <div className='container mx-auto px-4 py-2 flex flex-col space-y-2'>
            <Link
              to='/'
              className='hover:text-blue-500'
              onClick={() => setMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              to='/wishlist'
              className='hover:text-blue-500'
              onClick={() => setMenuOpen(false)}
            >
              Wishlist
            </Link>
            <Link
              to='/profile'
              className='hover:text-blue-500'
              onClick={() => setMenuOpen(false)}
            >
              Profile
            </Link>
            <Link
              to='/compare'
              className='hover:text-blue-500'
              onClick={() => setMenuOpen(false)}
            >
              Compare
            </Link>
          </div>
        </nav>
      )}
    </header>
  )
}

export default Header
