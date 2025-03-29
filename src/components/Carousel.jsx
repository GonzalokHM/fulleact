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
          className='btnArrowCarrousel left-0 '
          aria-label='Desplazar a la izquierda'
        >
          {' '}
          ◀{' '}
        </button>{' '}
        <div
          ref={carouselRef}
          className='flex overflow-x-auto space-x-4 scroll-smooth snap-x snap-mandatory scrollbar-custom'
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
          className='btnArrowCarrousel right-0 '
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
