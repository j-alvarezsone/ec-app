import React, { useState, useCallback } from 'react';
// component
import { TextInput, PrimaryButton } from '../components/UIkit';
// redux
import { signIn } from '../redux/users/operations';
import { useDispatch } from 'react-redux';
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
      </div>
    </div>
  );
};

export default SignIn;
