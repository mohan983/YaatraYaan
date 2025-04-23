import { Outlet, Navigate } from 'react-router-dom'
import Cookies from 'js-cookie'

const ProtectedRoute = () => {
  const token = Cookies.get('username')
  return token ? <Outlet /> : <Navigate to="/login" replace />
};

export default ProtectedRoute
