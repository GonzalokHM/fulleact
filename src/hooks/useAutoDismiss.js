import { useState, useEffect } from 'react'

export default function useAutoDismiss(trigger, duration) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (trigger > 0) {
      setVisible(true)
      const timer = setTimeout(() => {
        setVisible(false)
      }, duration)
      return () => clearTimeout(timer)
    }
  }, [trigger, duration])

  return visible
}
