import { useNavigate } from 'react-router-dom';
import { useAuth } from './assets/AuthContext';

const ProtectedRoute = ({ children, role }) => {
    const { isAuthenticated, userRole } = useAuth();
  
    console.log('isAuthenticated:', isAuthenticated);  
    console.log('userRole:', userRole);  
  
    if (!isAuthenticated || (role && userRole !== role)) {
      return <Navigate to={role === 'admin' ? '/admin/login' : '/user/login'} />;
    }
  
    return children;  
  };

export default ProtectedRoute;
