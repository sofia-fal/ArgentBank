import React from 'react';
import { Route, Routes } from 'react-router-dom';
// import { useSelector } from 'react-redux';
import Header from './components/header'
import Home from './pages/home';
import Signin from './pages/signin';

export default function App() {
  return (
    <div>
      <Header/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sign-in" element={<Signin />} />
      </Routes>
    </div>
  );
}