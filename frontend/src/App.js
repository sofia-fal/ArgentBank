import React, { useEffect } from 'react';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Header from './components/header';
import Footer from './components/footer';
import Home from './pages/home';
import Signin from './pages/signin';
import Profile from './pages/profil';
import PrivateRoute from './components/private';
import { fetchUserProfile, logout } from './redux/actions';

export default function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    // Si un token est présent, on récupère le profil utilisateur
    if (token) {
      dispatch(fetchUserProfile());
    }
  }, [dispatch, token]);

  useEffect(() => {
    // Vérifie si l'utilisateur est sur une URL invalide
    const validPaths = ['/', '/login', '/user/profile'];
    if (!validPaths.includes(location.pathname)) {
      // Déconnecter et rediriger vers la page de connexion
      dispatch(logout());
      navigate('/login');
    }
  }, [location, dispatch, navigate]);

  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Signin />} />
        <Route
          path="/user/profile"
          element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          }
        />
        <Route path="*" element={<Signin />} /> {/* Page par défaut pour les URL invalides */}
      </Routes>
      <Footer />
    </div>
  );
}
