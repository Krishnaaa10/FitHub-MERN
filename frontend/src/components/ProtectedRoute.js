import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

// Protects routes by checking for an auth token in Redux.
// Used as: <ProtectedRoute><SomePage /></ProtectedRoute>
const ProtectedRoute = ({ children }) => {
  const { token } = useSelector((state) => state.auth);

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;

