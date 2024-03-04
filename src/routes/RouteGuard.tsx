import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../auth/UseAuthContext';

type RouteGuardProps = {
  isPrivate: boolean;
};

const RouteGuard: React.FC<RouteGuardProps> = ({ isPrivate }) => {
  const { user } = useAuth();

  const isAuthenticated = () => {
    return !!user;
  };

  // Se a rota é privada e o usuário não está autenticado, redirecionar para o login
  if (isPrivate && !isAuthenticated()) {
    return <Navigate to="/login" />;
  }

  // Se a rota é pública e o usuário está autenticado, redirecionar para a home
  if (!isPrivate && isAuthenticated()) {
    return <Navigate to="/" />;
  }

  // Em outros casos, renderizar o componente
  return <Outlet />;
};

export default RouteGuard;
