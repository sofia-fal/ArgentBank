import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../redux/reducers/authSlice'; // Assurez-vous que le chemin est correct
import '../style/header.css';
import '../style/sr.css';
import Logo from '../assets/argentBankLogo.webp';

function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  // Accéder au prénom de l'utilisateur et à l'état de connexion
  const firstName = useSelector((state) => state.user.userData.firstName);
  const isConnected = useSelector((state) => state.auth.isConnected);

  const handleLogout = () => {
    dispatch(logout()); // Déclencher l'action de déconnexion
    navigate('/sign-in'); // Rediriger vers la page de connexion après la déconnexion
  };

  return (
    <header>
      <nav className="main-nav">
        <Link className="main-nav-logo" to="/">
          <img
            className="main-nav-logo-image"
            src={Logo}
            alt="Argent Bank Logo"
          />
        </Link>
        <h1 className="sr-only">Argent Bank</h1>
        {isConnected ? (
          <div className="user-info">
            <span className="main-nav-item">
              <i className="fa fa-user-circle"></i>
              {firstName}
            </span>
            <button className="main-nav-item" onClick={handleLogout}>
              Logout
            </button>
          </div>
        ) : (
          <Link className="main-nav-item" to="/sign-in">
            <i className="fa fa-user-circle"></i>
            Sign In
          </Link>
        )}
      </nav>
    </header>
  );
}

export default Header;
