import { memo, useRef } from 'react'
import { useNavigate } from 'react-router-dom'

function SearchForm() {
  const navigate = useNavigate()
  const searchRef = useRef()
  const filterRef = useRef()

  const handleSearch = async (e) => {
    e.preventDefault()
    const searchTerm = searchRef.current.value.trim()
    const filterType = filterRef.current.value

    if (!searchTerm.trim()) return

    filterType === 'category'
      ? { categoriaName: searchTerm }
      : { name: searchTerm }

    navigate(
      `/search-results?name=${encodeURIComponent(
        searchTerm
      )}&type=${encodeURIComponent(filterType)}`
    )
  }

  return (
    <form onSubmit={handleSearch} className=' flexRes'>
      <select
        id='filter'
        ref={filterRef}
        className='border1 mr-2 focus:outline-none'
      >
        <option value='name'>Nombre</option>
        <option value='category'>Categoría</option>
      </select>
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
