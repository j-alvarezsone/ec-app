import React from 'react';
//redux
import { useSelector } from 'react-redux';
import { getUserId, getUsername } from '../redux/users/selectors';

export const Home = () => {
  const selector = useSelector((state) => state);
  const uid = getUserId(selector);
  const userName = getUsername(selector);
  return (
    <div>
      <h2>Home</h2>
      <p>User ID: {uid}</p>
      <p>User Name: {userName}</p>
    </div>
  );
};

export default Home;
