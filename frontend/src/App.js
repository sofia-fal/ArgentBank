import React, { useEffect, useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Header from './components/header';
import Footer from './components/footer';
import Home from './pages/home';
import Signin from './pages/signin';
import Profile from './pages/profil';
import PrivateRoute from './components/private';
import { logout } from './redux/actions';

export default function App() {
  const location = useLocation();
  const dispatch = useDispatch();
  const [prevPath, setPrevPath] = useState(location.pathname);

  useEffect(() => {
    // Vérifier si l'utilisateur quitte la route /user/profile
    if (prevPath === '/user/profile' && location.pathname !== '/user/profile') {
      dispatch(logout());
    }

    // Mettre à jour le chemin précédent
    setPrevPath(location.pathname);
  }, [location, dispatch, prevPath]);

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
        <Route path="*" element={<Signin />} />
      </Routes>
      <Footer />
    </div>
  );
}
