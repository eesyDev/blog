import React from 'react';
import TextField from '@mui/material/TextField';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import noAvatarImg from '../img/noimage.jpg';
import { useRegisterUserMutation } from '../services/authApi';
import { setAuthState } from '../redux/slices/authSlice';

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [registerUser, {data, error}] = useRegisterUserMutation();

  const {
    register, handleSubmit, setError, formState: {errors, isValid}
  } = useForm({
    defaultValues: {
      fullName: "Petya Petechkin",
      email: 'test_petya_333@mail.ru',
      password: '1234567'
    },
    mode: 'onChange'
  });

  const onSubmit = async (values) => {
    let fullName = values.fullName;
    let email = values.email;
    let password = values.password;

    const userCredentials = {
      fullName, email, password
    }
    const response = await registerUser(userCredentials);
    console.log(response)
    dispatch(setAuthState({ isLoggedIn: true, data: { ...response.data } }))
    
    // if (response.data.token) {
    //   window.localStorage.setItem('token', response.data.token);
    // } else {
    //   return alert('Register failed')
    // }

    navigate('/')
  }
  return (
    <div className='register'>
      <h2 className="register-title">Create an account</h2>
      <img src={noAvatarImg} alt="" />
      <form className="register-form" onSubmit={handleSubmit(onSubmit)}>
      <TextField 
          label='Full Name' 
          error={Boolean(errors.fullName?.message)} 
          helperText={errors.fullName?.message}
          fullWidth
          className='field'
          {...register('fullName', {required: 'Put valid name'})}
          />
        <TextField 
          label='Email' 
          error={Boolean(errors.email?.message)} 
          helperText={errors.email?.message}
          fullWidth
          className='field'
          {...register('email', {required: 'Put valid email'})}
          />
          <TextField 
          label='Password' 
          error={Boolean(errors.password?.message)}  
          helperText={errors.password?.message}
          fullWidth
          className='field'
          {...register('password', {required: 'Put correct password'})}
          />
        <div className='register-submit'>
          <button type="submit" className='btn btn-solid'>Sign in</button>
        </div>
      </form>
    </div>
  )
}

export default Register