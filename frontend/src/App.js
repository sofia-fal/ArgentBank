import React from 'react';
import { Route, Routes } from 'react-router-dom';
// import { useSelector } from 'react-redux';
import Header from './components/header'
import Footer from './components/footer'
import Home from './pages/home';
import Signin from './pages/signin';
import Profile from './pages/profile';
import PrivateRoute from './components/private';

export default function App() {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sign-in" element={<Signin />} />
        <Route
          path="/user"
          element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          }
        />
      </Routes>
      <Footer />
    </div>
  );
}