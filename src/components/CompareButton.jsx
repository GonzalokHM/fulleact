import useStore from '../store/useStore'

function CompareButton({ productId }) {
  const { comparison, addComparison, removeComparison } = useStore()
  const isInComparison = comparison.includes(productId)

  const handleClick = () => {
    if (isInComparison) {
      removeComparison(productId)
    } else {
      addComparison(productId)
    }
  }

  return (
    <button
      onClick={handleClick}
      className='bg-purple-500 hover:bg-purple-600 text-white py-1 px-1 rounded w-10'
    >
      {isInComparison ? '-' : '+'}
    </button>
  )
}

export default CompareButton
