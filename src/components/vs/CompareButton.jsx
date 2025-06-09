import { useState } from 'react'
import useAutoDismiss from '../../hooks/useAutoDismiss'
import useComparisonProduct from '../../hooks/useComparisonProduct'
import useStore from '../../store/useStore'

function CompareButton({ productId }) {
  const [triggerCount, setTriggerCount] = useState(0)
  const [toastMsg, setToastMsg] = useState('')
  const [bgClass, setBgClass] = useState('')
  const showMessage = useAutoDismiss(triggerCount, 2000)
  const { isInComparison, addComparison, removeComparison } =
    useComparisonProduct(productId)

  const handleClick = () => {
    const currentCount = useStore.getState().comparison.length
    if (isInComparison) {
      removeComparison(productId)
      setToastMsg('Quitado de la comparación')
      setBgClass('backgBlurDimisDelet')
    } else {
      if (currentCount >= 4) {
        setToastMsg('Solo puedes comparar hasta 4 productos')
        setBgClass('backgBlurDimisDelet')
      } else {
        addComparison(productId)
        setToastMsg('Añadido a comparación')
        setBgClass('backgBlurDimisplus')
      }
    }
    setTriggerCount((prev) => prev + 1)
  }

  return (
    <div className='relative'>
      <button
        onClick={handleClick}
        className='btnCompare'
        aria-pressed={isInComparison}
      >
        {isInComparison ? '-' : '+'}
      </button>
      {showMessage && (
        <div className={`compareDimis ${bgClass}`} role='status'>
          {toastMsg}
        </div>
      )}
    </div>
  )
}

export default CompareButton
