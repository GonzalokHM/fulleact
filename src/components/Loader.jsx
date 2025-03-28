function Loader({ size = 'w-10 h-10', label = 'Cargando...' }) {
  return (
    <div
      className='flex flex-col items-center justify-center text-gray-500'
      role='status'
      aria-live='polite'
    >
      <div
        className={`animate-spin rounded-full border-4 border-t-transparent border-blue-500 ${size}`}
      />
      <span className='mt-2 text-sm'>{label}</span>
    </div>
  )
}

export default Loader
