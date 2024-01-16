import React, { useEffect } from 'react';
import './index.scss';
import { Routes, Route } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Header } from './components';
import { Login, Register, Home,  AddPost, SinglePost } from './pages';
import { useGetProfileQuery } from './services/authApi';
import { getProfile } from './redux/slices/authSlice';

function App() {
	const dispatch = useDispatch();
	const profile = useGetProfileQuery();
	const { data } = profile;

	useEffect(() => {
		const storedAuthData = localStorage.getItem('token');
		if (storedAuthData) {
			dispatch(getProfile({ isLoggedIn: true, data: {...data} }))
		}
	}, [])


  return (
    <div className="App">
      	<Header/>
		<Routes>
			<Route path="/" element={<Home />} />
			<Route path="/posts/:id" element={<SinglePost />} />
			<Route path="/posts/:id/edit" element={<AddPost />} />
			<Route path="/add-post" element={<AddPost />} />
			<Route path="/login" element={<Login />} />
			<Route path="/register" element={<Register />} />
		</Routes>
    </div>
  );
}

export default App;
