import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { listenAuthState } from './redux/users/operations';
import { getIsSignedIn } from './redux/users/selectors';

const Auth = ({ children }) => {
  const dispatch = useDispatch();
  const selector = useSelector((state) => state);

  const isSignedIn = getIsSignedIn(selector);

  useEffect(() => {
    if (!isSignedIn) {
      dispatch(listenAuthState());
    }
  }, [isSignedIn, dispatch]);

  return isSignedIn ? children : <></>;
};

export default Auth;
