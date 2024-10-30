import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../redux/actions';
import '../style/header.css';
import '../style/sr.css';
import Logo from '../assets/argentBankLogo.webp';

function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userName = useSelector((state) => state.user.userData.userName);
  const isConnected = useSelector((state) => state.auth.isConnected);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  const handleProfileClick = () => {
    navigate(isConnected ? '/user/profile' : '/login');
  };

  return (
    <header>
      <nav className="main-nav">
        <Link className="main-nav-logo" to="/">
          <img className="main-nav-logo-image" src={Logo} alt="Argent Bank Logo" />
        </Link>
        <h1 className="sr-only">Argent Bank</h1>
        {isConnected ? (
          <div className="user-info">
            <button className="main-nav-item" onClick={handleProfileClick}>
              <i className="fa fa-user-circle"></i> {userName}
            </button>
            <button className="logout" onClick={handleLogout}>
              <i className="fa fa-sign-out"></i> Sign Out
            </button>
          </div>
        ) : (
          <button className="main-nav-item" onClick={handleProfileClick}>
            <i className="fa fa-user-circle"></i> Sign In
          </button>
        )}
      </nav>
    </header>
  );
}

export default Header;
