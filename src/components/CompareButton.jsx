import useComparisonProduct from '../hooks/useComparisonProduct'

function CompareButton({ productId }) {
  const { isInComparison, addComparison, removeComparison } =
    useComparisonProduct(productId)

  const handleClick = () => {
    if (isInComparison) {
      removeComparison(productId)
    } else {
      addComparison(productId)
    }
  }

  return (
    <button onClick={handleClick} className='btnCompare'>
      {isInComparison ? '-' : '+'}
    </button>
  )
}

export default CompareButton
