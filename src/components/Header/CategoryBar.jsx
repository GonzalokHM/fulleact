import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getCategories } from '../../api/category'
import Loader from '../Loader'

function CategoriesBar() {
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let ignore = false
    ;(async () => {
      const { response, error } = await getCategories()
      if (!ignore) {
        if (!error) setCategories(response)
        setLoading(false)
      }
    })()
    return () => {
      ignore = true
    }
  }, [])

  if (loading) return <Loader size='w-6 h-6' label='Cargando categorias...' />

  return (
    <nav className='overflow-x-auto scrollbar-custom py-2'>
      <ul className='flex space-x-4'>
        {categories.map((cat) => (
          <li key={cat._id} className='flex-shrink-0'>
            <Link
              to={`/search-results?name=${encodeURIComponent(
                cat.nombre
              )}&type=category`}
              className='flex items-center space-x-1'
            >
              <img
                src={cat.icono}
                alt={cat.nombre}
                className='w-6 h-6 rounded-b-sm'
              />
              <span className='categoryLink'>{cat.nombre}</span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}

export default CategoriesBar
