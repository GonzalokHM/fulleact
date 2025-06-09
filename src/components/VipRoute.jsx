import { Navigate, useLocation } from 'react-router-dom'
import useStore from '../store/useStore'

function VIPRoute({ children }) {
  const { user } = useStore()
  const location = useLocation()

  if (!user) {
    return <Navigate to='/login' replace />
  }
  if (!user.vip) {
    return (
      <Navigate
        to='/getvip'
        replace
        state={{ from: location.pathname, ...location.state }}
      />
    )
  }

  return children
}

export default VIPRoute
