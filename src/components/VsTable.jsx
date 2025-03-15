function ComparisonTable({ products, removeComparison }) {
  return (
    <div className='overflow-x-auto'>
      <table className='min-w-full border-collapse'>
        <thead>
          <tr>
            <th className='p-4 border bg-gray-100'>Característica</th>
            {products.map((product) => (
              <th key={product.asin} className='p-4 border bg-gray-100'>
                <div className='flex flex-col items-center'>
                  <img
                    src={product.img}
                    alt={product.titulo}
                    className='w-16 h-16 object-cover mb-2'
                  />
                  <span className='font-bold text-sm text-center'>
                    {product.titulo}
                  </span>
                  <button
                    onClick={() => removeComparison(product.asin)}
                    className='mt-2 text-red-500 text-xs'
                  >
                    Quitar
                  </button>
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className='p-4 border font-bold'>Precio</td>
            {products.map((product) => (
              <td key={product.asin} className='p-4 border text-center'>
                ${product.precio}
              </td>
            ))}
          </tr>
          <tr>
            <td className='p-4 border font-bold'>Marca</td>
            {products.map((product) => (
              <td key={product.asin} className='p-4 border text-center'>
                {product.marca}
              </td>
            ))}
          </tr>
          <tr>
            <td className='p-4 border font-bold'>Puntuación</td>
            {products.map((product) => (
              <td key={product.asin} className='p-4 border text-center'>
                {product.puntuacion}
              </td>
            ))}
          </tr>
          <tr>
            <td className='p-4 border font-bold'>Categoría</td>
            {products.map((product) => (
              <td key={product.asin} className='p-4 border text-center'>
                {product.categoria ? product.categoria.nombre : 'N/A'}
              </td>
            ))}
          </tr>
          <tr>
            <td className='p-4 border font-bold'>Descripción</td>
            {products.map((product) => (
              <td key={product.asin} className='p-4 border'>
                {product.descripcion}
              </td>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export default ComparisonTable
