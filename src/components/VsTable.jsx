function ComparisonTable({ products, removeComparison }) {
  return (
    <div className='overflow-x-auto'>
      <table className='min-w-full border-collapse'>
        <thead>
          <tr>
            <th className='vsth'>Característica</th>
            {products.map((product) => (
              <th key={product._id} className='vsth'>
                <div className='flexColCent'>
                  <img
                    src={product.img}
                    alt={product.titulo}
                    className='w-16 h-16 object-cover mb-2'
                  />
                  <span className='font-bold text-sm text-center'>
                    {product.titulo}
                  </span>
                  <button
                    onClick={() => removeComparison(product._id)}
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
            <td className='vstd'>Precio</td>
            {products.map((product) => (
              <td key={product._id} className='vstdI'>
                ${product.precio}
              </td>
            ))}
          </tr>
          <tr>
            <td className='vstd'>Marca</td>
            {products.map((product) => (
              <td key={product._id} className='vstdI'>
                {product.marca}
              </td>
            ))}
          </tr>
          <tr>
            <td className='vstd'>Puntuación</td>
            {products.map((product) => (
              <td key={product._id} className='vstdI'>
                {product.puntuacion}
              </td>
            ))}
          </tr>
          <tr>
            <td className='vstd'>Categoría</td>
            {products.map((product) => (
              <td key={product._id} className='vstdI'>
                {product.categoria ? product.categoria.nombre : 'N/A'}
              </td>
            ))}
          </tr>
          <tr>
            <td className='vstd'>Descripción</td>
            {products.map((product) => (
              <td key={product._id} className='contPading border'>
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
