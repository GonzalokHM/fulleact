import { useState, useEffect } from 'react'

export default function useAutoDismiss(initialValue, duration) {
  const [visible, setVisible] = useState(initialValue)

  useEffect(() => {
    if (initialValue) {
      const timer = setTimeout(() => {
        setVisible(false)
      }, duration)
      return () => clearTimeout(timer)
    }
  }, [initialValue, duration])

  return visible
}
