import { memo, useCallback, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'

function SearchForm() {
  const navigate = useNavigate()
  const searchRef = useRef()
  const [filterType, setFilterType] = useState('name')
  const [dropdownOpen, setDropdownOpen] = useState(false)

  const handleFilterSelect = useCallback((type) => {
    setFilterType(type)
    setDropdownOpen(false)
  }, [])

  const handleSearch = useCallback(
    (e) => {
      e.preventDefault()
      const searchTerm = searchRef.current.value.trim()
      if (!searchTerm) return

      navigate(
        `/search-results?name=${encodeURIComponent(
          searchTerm
        )}&type=${encodeURIComponent(filterType)}`
      )
    },
    [navigate, filterType]
  )

  return (
    <form onSubmit={handleSearch} className=' flexRes relative'>
      <div className='relative'>
        <button
          type='button'
          onClick={() => setDropdownOpen(!dropdownOpen)}
          className='border1 mr-2 focus:outline-none flex items-center justify-center p-2'
          aria-label='Seleccionar filtro'
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            className='h-5 w-5 text-sky-600'
            fill='none'
            viewBox='0 0 24 24'
            stroke='currentColor'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M3 4a1 1 0 011-1h16a1 1 0 011 1v2a1 1 0 01-.293.707L14 13.414V19a1 1 0 01-.553.894l-4 2A1 1 0 019 21v-7.586L3.293 6.707A1 1 0 013 6V4z'
            />
          </svg>
        </button>
        {dropdownOpen && (
          <div className='absolute right-0 mt-2 w-40 bg-white border rounded shadow-lg z-20'>
            <button
              type='button'
              onClick={() => handleFilterSelect('name')}
              className='block w-full text-left px-4 py-2 hover:bg-gray-100'
            >
              Nombre
            </button>
            <button
              type='button'
              onClick={() => handleFilterSelect('category')}
              className='block w-full text-left px-4 py-2 hover:bg-gray-100'
            >
              Categoría
            </button>
          </div>
        )}
      </div>
      <input
        type='text'
        id='search'
        ref={searchRef}
        placeholder='Buscar producto...'
        className='border1 w-full md:w-auto'
      />
      <button type='submit' className='btnInf'>
        Buscar
      </button>
    </form>
  )
}

export default memo(SearchForm)
