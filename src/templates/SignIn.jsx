import React, { useState, useCallback } from 'react';
// component
import { TextInput, PrimaryButton } from '../components/UIkit';
// redux
import { signIn } from '../redux/users/operations';
import { useDispatch } from 'react-redux';
import { push } from 'connected-react-router';
const SignIn = () => {
  const [email, setEmail] = useState(''),
    [password, setPassword] = useState('');

  const inputEmail = useCallback(
    (e) => {
      setEmail(e.target.value);
    },
    [setEmail]
  );
  const inputPassword = useCallback(
    (e) => {
      setPassword(e.target.value);
    },
    [setPassword]
  );

  const dispatch = useDispatch();

  return (
    <div className='c-section-container'>
      <h2 className='u-text__headline u-text-center'>Sign In</h2>
      <div className='module-spacer--medium' />
      <TextInput
        fullWidth={true}
        label={'Email'}
        multiline={false}
        required={true}
        rows={1}
        value={email}
        type={'email'}
        onChange={inputEmail}
      />
      <TextInput
        fullWidth={true}
        label={'password'}
        multiline={false}
        required={true}
        rows={1}
        value={password}
        type={'password'}
        onChange={inputPassword}
      />
      <div className='module-spacer--medium' />
      <div className='center'>
        <PrimaryButton
          label={'Sign In'}
          onClick={() => dispatch(signIn(email, password))}
        />
        <div className='module-spacer--medium' />
        <p onClick={() => dispatch(push('/signup'))}>
          Who do not have an account
        </p>
        <p onClick={() => dispatch(push('/signin/reset'))}>
          Who have forgotten your password
        </p>
      </div>
    </div>
  );
};

export default SignIn;
