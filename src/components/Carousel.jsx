import ProductCard from './ProductCard'

function Carousel({ title, products }) {
  return (
    <div className='my-8'>
      <h2 className='text-2xl font-bold mb-4'>{title}</h2>
      <div className='flex overflow-x-auto space-x-4'>
        {products.map((product) => (
          <div key={product._id || product.asin} className='min-w-[250px]'>
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </div>
  )
}

export default Carousel
