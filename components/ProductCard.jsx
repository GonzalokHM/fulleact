// src/components/ProductCard.jsx
import React from 'react'
import useStore from '../store/useStore'

function ProductCard({ product }) {
  const { addComparison } = useStore()

  return (
    <div className='p-4 border rounded'>
      <h2 className='text-xl font-bold'>{product.titulo}</h2>
      <p>{product.descripcion}</p>
      <button
        onClick={() => addComparison(product.id)}
        className='mt-2 px-4 py-2 bg-blue-500 text-white rounded'
      >
        Comparar
      </button>
    </div>
  )
}

export default ProductCard
