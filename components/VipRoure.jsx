// src/components/VIPRoute.jsx
import { Navigate } from 'react-router-dom'
import useStore from '../store/useStore'

function VIPRoute({ children }) {
  const { user } = useStore()

  if (!user || !user.vip) {
    return <Navigate to='/getVip' replace />
  }

  return children
}

export default VIPRoute
