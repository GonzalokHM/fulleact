import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { filterProducts } from '../api/productApi'

function Header() {
  const location = useLocation()
  const navigate = useNavigate()
  const [searchTerm, setSearchTerm] = useState('')
  const [filterType, setFilterType] = useState('name')

  const handleSearch = async (e) => {
    e.preventDefault()
    if (!searchTerm.trim()) return
    try {
      let searchParams = {}
      if (filterType === 'category') {
        searchParams = { categoriaName: searchTerm }
      } else {
        searchParams = { name: searchTerm }
      }
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

        <nav className='flex items-center space-x-4'>
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
          <form onSubmit={handleSearch} className='flex items-center'>
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className='border rounded px-2 py-1 mr-2'
            >
              <option value='name'>Buscar por Nombre</option>
              <option value='category'>Buscar por Categoría</option>
            </select>
            <input
              type='text'
              placeholder='Buscar producto...'
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className='border rounded px-2 py-1'
            />
            <button
              type='submit'
              className='ml-2 bg-blue-500 text-white px-3 py-1 rounded'
            >
              Buscar
            </button>
          </form>
        )}
      </div>
    </header>
  )
}

export default Header
