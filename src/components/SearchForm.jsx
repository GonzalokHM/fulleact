import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { filterProducts } from '../api/products'

function SearchForm() {
  const navigate = useNavigate()
  const [searchTerm, setSearchTerm] = useState('')
  const [filterType, setFilterType] = useState('name')

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
          navigate(
            `/search-results?name=${encodeURIComponent(
              searchTerm
            )}&type=${encodeURIComponent(filterType)}`
          )
        } else {
          navigate(
            `/vipSearch?name=${encodeURIComponent(
              searchTerm
            )}&type=${encodeURIComponent(filterType)}`
          )
        }
      }
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <form
      onSubmit={handleSearch}
      className='flex flex-col md:flex-row items-end md:items-center space-y-2 md:space-y-0 md:space-x-2 '
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
  )
}

export default SearchForm
