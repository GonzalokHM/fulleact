import useStore from '../store/useStore'

function Vs() {
  const { comparison, removeComparison, clearComparison } = useStore()

  return (
    <div className='p-4'>
      <h1 className='text-3xl font-bold'>Comparar Productos</h1>
      {comparison.length === 0 ? (
        <p>No has seleccionado productos para comparar.</p>
      ) : (
        <ul>
          {comparison.map((productId) => (
            <li key={productId} className='p-2 border-b'>
              Producto ID: {productId}
              <button
                onClick={() => removeComparison(productId)}
                className='ml-2 text-red-500'
              >
                Quitar
              </button>
            </li>
          ))}
        </ul>
      )}
      {comparison.length > 0 && (
        <button
          onClick={clearComparison}
          className='mt-4 px-4 py-2 bg-gray-300'
        >
          Limpiar Comparación
        </button>
      )}
    </div>
  )
}

export default Vs
