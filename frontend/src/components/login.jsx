import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../redux/reducers/authSlice';
import { useNavigate } from 'react-router-dom';
import '../style/login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isConnected, status, error } = useSelector((state) => state.auth);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login({ email, password }));
  };

  // Surveiller les changements dans le state pour rediriger après connexion réussie
  useEffect(() => {
    if (isConnected) {
      navigate('/user'); // Redirige vers /user si l'utilisateur est connecté
    }
  }, [isConnected, navigate]); // La redirection ne se fait que lorsque "isConnected" change

  return (
    <form onSubmit={handleSubmit}>
      <div className="input-wrapper">
        <label htmlFor="username">Email</label>
        <input
          type="text"
          id="username"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div className="input-wrapper">
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <div className="input-remember">
        <input type="checkbox" id="remember-me" />
        <label htmlFor="remember-me">Remember me</label>
      </div>

      <button className="sign-in-button" type="submit">
        Sign In
      </button>

      {status === 'LOADING' && <p>Loading...</p>}
      {error && <p className="error">Error: {error}</p>}
    </form>
  );
};

export default Login;
