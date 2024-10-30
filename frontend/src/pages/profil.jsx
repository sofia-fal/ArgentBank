import React from 'react';
import { useSelector } from 'react-redux';
import AccountData from '../datas/accounts.json';
import Account from '../components/account';
import User from '../components/user';
import '../style/profile.css';
import { Navigate } from 'react-router-dom';


function Profile() {
  const isConnected = useSelector((state) => state.auth.isConnected);

  if (!isConnected) {
    return <Navigate to="/login" replace />;
  }

  return (
    <main className="main bg-dark">
      <User />
      {AccountData.map((data) => (
        <Account key={data.id} title={data.title} amount={data.amount} description={data.description} />
      ))}
    </main>
  );
}

export default Profile;
