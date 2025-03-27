import useStore from '../store/useStore'

export default function useComparisonProduct(productId) {
  const isInComparison = useStore((state) =>
    state.comparison.includes(productId)
  )
  const addComparison = useStore((state) => state.addComparison)
  const removeComparison = useStore((state) => state.removeComparison)

  return {
    isInComparison,
    addComparison,
    removeComparison
  }
}
