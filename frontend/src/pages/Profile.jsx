import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { logout } from '../redux/reducers/authSlice';
import AccountData from '../datas/accounts.json';
import Account from '../components/account';
import User from '../components/user';
import '../style/profile.css';

function Profile() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation(); // Pour obtenir le chemin actuel
  const token = useSelector((state) => state.auth.token); // Récupérer le token depuis l'état global

  useEffect(() => {
    // Vérifier si le token est présent
    if (!token) {
      navigate('/login'); // Rediriger vers la page de connexion si le token est manquant
    }

    // Fonction de nettoyage pour vérifier le changement de route
    const handleRouteChange = () => {
      if (location.pathname !== '/user/profile') {
        // Si l'utilisateur navigue hors de /user/profile, déconnexion
        dispatch(logout());
      }
    };

    // Ajouter un écouteur de changement d'URL
    handleRouteChange();

    // Nettoyage : vérifier à chaque changement d'URL
    return () => {
      handleRouteChange();
    };
  }, [token, location, navigate, dispatch]);

  // Si le token est présent, afficher le contenu
  if (!token) {
    return null;
  }

  return (
    <main className="main bg-dark">
      <User />
      {AccountData.map((data) => (
        <Account
          key={data.id}
          title={data.title}
          amount={data.amount}
          description={data.description}
        />
      ))}
    </main>
  );
}

export default Profile;
