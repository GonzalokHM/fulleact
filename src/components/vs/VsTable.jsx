function ComparisonTable({ products, removeComparison }) {
  return (
    <div className='overflow-x-auto rounded-xl shadow'>
      <table className='min-w-full border-collapse'>
        <thead>
          <tr>
            <th>🛑</th>
            {products.map((product) => (
              <th scope='col' key={product._id} className='vsth backgBlur3'>
                <div className='flexColCent '>
                  <img
                    src={product.img}
                    alt={product.titulo}
                    className='w-25 h-25 object-cover '
                  />
                  <span className='font-medium text-sm text-center line-clamp-2'>
                    {product.titulo}
                  </span>
                  <button
                    onClick={() => removeComparison(product._id)}
                    className='btnRemoveComp'
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
            <th scope='row' className='vstd backgBlur2'>
              Precio
            </th>
            {products.map((product) => (
              <td key={product._id} className='vstdI backgBlur1'>
                ${product.precio}
              </td>
            ))}
          </tr>
          <tr>
            <th scope='row' className='vstd backgBlur2'>
              Marca
            </th>
            {products.map((product) => (
              <td key={product._id} className='vstdI backgBlur1'>
                {product.marca}
              </td>
            ))}
          </tr>
          <tr>
            <th scope='row' className='vstd backgBlur2'>
              Puntuación
            </th>
            {products.map((product) => (
              <td key={product._id} className='vstdI backgBlur1'>
                {product.puntuacion}⭐
              </td>
            ))}
          </tr>
          <tr>
            <th scope='row' className='vstd backgBlur2'>
              Categoría
            </th>
            {products.map((product) => (
              <td key={product._id} className='vstdI backgBlur1'>
                {product.categoria ? product.categoria.nombre : 'N/A'}
              </td>
            ))}
          </tr>
          <tr>
            <th scope='row' className='vstd backgBlur'>
              Descripción
            </th>
            {products.map((product) => (
              <td
                key={product._id}
                className='text-sm text-gray-800 leading-snug'
              >
                <div className='max-h-40 overflow-y-auto whitespace-pre-line p-0.5 backgBlur6'>
                  {product.descripcion}
                </div>
              </td>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export default ComparisonTable
