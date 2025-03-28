import { memo, useRef } from 'react'
import ProductCard from './ProductCard'

function Carousel({ title, products }) {
  const carouselRef = useRef(null)
  const scrollLeft = () => {
    carouselRef.current.scrollBy({ left: -300, behavior: 'smooth' })
  }
  const scrollRight = () => {
    carouselRef.current.scrollBy({ left: 300, behavior: 'smooth' })
  }
  return (
    <section
      className='my-8'
      role='region'
      aria-label={`Carrusel de productos: ${title}`}
    >
      {' '}
      <h2 className='backgBlur2'>{title}</h2>{' '}
      <div className='relative'>
        {' '}
        <button
          onClick={scrollLeft}
          className='absolute left-0 top-1/3 transform -translate-y-1/3 z-10 bg-gray-100-opacity-70 backdrop-blur-sm p-2.5 rounded-full shadow hover:bg-gray-200'
          aria-label='Desplazar a la izquierda'
        >
          {' '}
          ◀{' '}
        </button>{' '}
        <div
          ref={carouselRef}
          className='flex overflow-x-auto space-x-4 scroll-smooth snap-x snap-mandatory'
        >
          {' '}
          {products.map((product) => (
            <article
              key={product._id}
              className='min-w-[250px] flex justify-between snap-start '
            >
              {' '}
              <ProductCard product={product} />{' '}
            </article>
          ))}{' '}
        </div>{' '}
        <button
          onClick={scrollRight}
          className='absolute right-0 top-1/3 transform -translate-y-1/3 z-10 bg-gray-100-opacity-70 backdrop-blur-sm p-2.5 rounded-full shadow hover:bg-gray-200'
          aria-label='Desplazar a la derecha'
        >
          {' '}
          ▶{' '}
        </button>{' '}
      </div>{' '}
    </section>
  )
}

export default memo(Carousel)
