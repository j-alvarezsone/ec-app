import React from 'react';
//redux
import { useSelector, useDispatch } from 'react-redux';
import { signOut } from '../redux/users/operations';
import { getUserId, getUsername } from '../redux/users/selectors';

export const Home = () => {
  const selector = useSelector((state) => state);
  const dispatch = useDispatch();
  const uid = getUserId(selector);
  const userName = getUsername(selector);
  return (
    <div>
      <h2>Home</h2>
      <p>User ID: {uid}</p>
      <p>User Name: {userName}</p>
      <button onClick={() => dispatch(signOut())}>Sign Out</button>
    </div>
  );
};

export default Home;
