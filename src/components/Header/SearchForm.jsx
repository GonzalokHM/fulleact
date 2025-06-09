import { memo, useCallback, useRef } from 'react'
import { useNavigate } from 'react-router-dom'

function SearchForm() {
  const navigate = useNavigate()
  const searchRef = useRef()

  const handleSearch = useCallback(
    (e) => {
      e.preventDefault()
      const searchTerm = searchRef.current.value.trim()
      if (!searchTerm) return

      navigate(`/search-results?name=${encodeURIComponent(searchTerm)}`)
    },
    [navigate]
  )

  return (
    <form onSubmit={handleSearch} className=' flexRes'>
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
