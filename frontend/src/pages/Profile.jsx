import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchUserProfile } from '../redux/actions';
import AccountData from '../datas/accounts.json';
import Account from '../components/account';
import User from '../components/user';
import '../style/profile.css';

function Profile() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    if (!token) {
      navigate('/login');
    } else {
      dispatch(fetchUserProfile());
    }
  }, [token, dispatch, navigate]);

  if (!token) {
    return null; // Empêcher le rendu si l'utilisateur n'est pas connecté
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
