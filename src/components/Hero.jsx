function Hero({ user }) {
  return (
    <section className='relative w-full h-[300px] flex items-center justify-center overflow-hidden'>
      <picture>
        <source media='(min-width: 1024px)' srcSet='/hero-lg.webp' />
        <source media='(min-width: 640px)' srcSet='/hero-sm.webp' />
        <img
          src='/hero.webp'
          alt='Imagen de bienvenida'
          height={300}
          className='absolute inset-0 w-full h-[300px] object-cover'
          loading='eager' // para LCP
        />
      </picture>

      <div className='absolute inset-0 bg-black/50' />
      <div className='relative text-center text-white px-4 z-10'>
        <h1 className='text-2xl sm:text-3xl font-bold'>
          Ahorra y encuentra lo que necesites
        </h1>

        {user && (
          <div className='mt-4 flex flex-col items-center justify-center'>
            <p className={`text-xl ${user.vip ? 'font-bold' : ''}`}>
              Hola, {user.username}{' '}
              {user.vip && <span className='viplogo'>VIP</span>}
            </p>
            {user.avatar && (
              <img
                src={user.avatar}
                alt='Avatar de usuario'
                width={48}
                height={48}
                className='w-12 h-12 rounded-full object-cover mt-2'
              />
            )}
          </div>
        )}

        <h3 className='mt-2 text-amber-100'>
          Descubre las mejores ofertas en Amazon
        </h3>
      </div>
    </section>
  )
}

export default Hero
