import { useState } from 'react'
import useAutoDismiss from '../../hooks/useAutoDismiss'
import useComparisonProduct from '../../hooks/useComparisonProduct'

function CompareButton({ productId }) {
  const [triggerCount, setTriggerCount] = useState(0)
  const showMessage = useAutoDismiss(triggerCount, 2000)
  const { isInComparison, addComparison, removeComparison } =
    useComparisonProduct(productId)

  const handleClick = () => {
    if (isInComparison) {
      removeComparison(productId)
    } else {
      addComparison(productId)
    }
    setTriggerCount((prev) => prev + 1)
  }

  const actionMessage = isInComparison
    ? 'Añadido a comparación'
    : 'Quitado de la comparación'
  const bgClass = isInComparison ? 'backgBlurDimisplus' : 'backgBlurDimisDelet'

  return (
    <div className='relative'>
      <button onClick={handleClick} className='btnCompare'>
        {isInComparison ? '-' : '+'}
      </button>
      {showMessage && (
        <div className={`compareDimis ${bgClass}`}>{actionMessage}</div>
      )}
    </div>
  )
}

export default CompareButton
