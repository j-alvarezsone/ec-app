import React, { useState, useCallback } from 'react';
// component
import { TextInput, PrimaryButton } from '../components/UIkit';
// redux
import { resetPassword } from '../redux/users/operations';
import { useDispatch } from 'react-redux';
import { push } from 'connected-react-router';
const Reset = () => {
  const [email, setEmail] = useState('');

  const inputEmail = useCallback(
    (e) => {
      setEmail(e.target.value);
    },
    [setEmail]
  );

  const dispatch = useDispatch();

  return (
    <div className='c-section-container'>
      <h2 className='u-text__headline u-text-center'>Password Reset</h2>
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

      <div className='module-spacer--medium' />
      <div className='center'>
        <PrimaryButton
          label={'Reset password'}
          onClick={() => dispatch(resetPassword(email))}
        />
        <div className='module-spacer--medium' />
        <p onClick={() => dispatch(push('/signin'))}>
          Return to the login page
        </p>
      </div>
    </div>
  );
};

export default Reset;
