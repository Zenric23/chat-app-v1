import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

const AuthGuard = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    if (!user?.isLoggedIn) {
      navigate('/login', { replace: true });
    }
  }, [user?.isLoggedIn, navigate]);

  return <Outlet />;
};

export default AuthGuard;
