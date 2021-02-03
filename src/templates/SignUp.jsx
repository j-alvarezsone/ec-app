import React, { useState, useCallback } from 'react';
// component
import { TextInput, PrimaryButton } from '../components/UIkit';
// redux
import { signUp } from '../redux/users/operations';
import { useDispatch } from 'react-redux';
import { push } from 'connected-react-router';
const SignUp = () => {
  const [username, setUsername] = useState(''),
    [email, setEmail] = useState(''),
    [password, setPassword] = useState(''),
    [confirmPassword, setConfirmPassword] = useState('');

  const inputUsername = useCallback(
    (e) => {
      setUsername(e.target.value);
    },
    [setUsername]
  );
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
  const inputConfirmPassword = useCallback(
    (e) => {
      setConfirmPassword(e.target.value);
    },
    [setConfirmPassword]
  );

  const dispatch = useDispatch();

  return (
    <div className='c-section-container'>
      <h2 className='u-text__headline u-text-center'>Sign up</h2>
      <div className='module-spacer--medium' />
      <TextInput
        fullWidth={true}
        label={'User Name'}
        multiline={false}
        required={true}
        rows={1}
        value={username}
        type={'text'}
        onChange={inputUsername}
      />
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
      <TextInput
        fullWidth={true}
        label={'Confirm password'}
        multiline={false}
        required={true}
        rows={1}
        value={confirmPassword}
        type={'password'}
        onChange={inputConfirmPassword}
      />
      <div className='module-spacer--medium' />
      <div className='center'>
        <PrimaryButton
          label={'Sign up'}
          onClick={() =>
            dispatch(signUp(username, email, password, confirmPassword))
          }
        />
        <div className='module-spacer--medium' />
        <p onClick={() => dispatch(push('/signin'))}>Already have an account</p>
      </div>
    </div>
  );
};

export default SignUp;
