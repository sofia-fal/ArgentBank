import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';
import { logout } from '../redux/actions';

const PrivateRoute = ({ children }) => {
  const isAuthenticated = useSelector((state) => state.auth.isConnected);
  const dispatch = useDispatch();
  const location = useLocation();

  if (!isAuthenticated) {
    dispatch(logout()); // Déconnecte l'utilisateur s'il n'est pas authentifié
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default PrivateRoute;
