import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import './header.scss';
import { logout } from '../../redux/slices/authSlice';

const Header = () => {
  const dispatch = useDispatch();
  const isAuth = useSelector((state) => state.authSlice.isLoggedIn);

  const onClickLogout = async () => {
    try {
      if (window.confirm('Are you sure you want to log out')) {
        dispatch(logout());
        window.localStorage.removeItem('token')
        window.localStorage.removeItem('current_user_id');
      }
    } catch (err) {
      console.error('Error logging out', err)
    }
  }

  console.log(isAuth)
  return (
    <header className='header'>
      <div className='container'>
        <div className="header-wrapper wrapper">
          <div className='header-logo'>
            <Link to='/'>LOGO</Link>
          </div>
          <div className='header-btns'>
            {
              isAuth ? (
                <>
                  <Link to='/add-post' className='btn btn-outlined'>Create Post</Link>
                  <button className='btn btn-error' onClick={onClickLogout}>Log out</button>
                </>
              ) : (
                <>
                  <Link to='/login' className='btn btn-outlined'>Log in</Link>
                  <Link to='/register' className='btn btn-solid'>Create Acoount</Link>
                </>
              )
            }
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header