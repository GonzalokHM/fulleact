import useStore from '../store/useStore'

function Home() {
  const { products, setProducts } = useStore()

  // Imagina que traes productos desde el backend y los actualizas
  // useEffect(() => {
  //   fetchProducts().then(data => setProducts(data))
  // }, [setProducts])

  return (
    <div className='p-4'>
      <h1 className='text-3xl font-bold'>Listado de Productos</h1>
      <ul className='mt-4'>
        {products.map((product) => (
          <li key={product.id} className='p-2 border-b'>
            {product.titulo}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Home
