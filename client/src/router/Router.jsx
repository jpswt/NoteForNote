import { Routes, Route, Navigate, Outlet } from 'react-router-dom';
import cookie from 'cookie';
import Navbar from '../components/Navbar';
import Compose from '../pages/Compose';
import Home from '../pages/Home';
import Login from '../pages/Login';
import Register from '../pages/Register';
import SinglePostDetails from '../pages/SinglePostDetails';
import Profile from '../pages/Profile';
import { Context } from '../context/Context';
import { useContext } from 'react';

const checkAuth = () => {
	const cookies = cookie.parse(document.cookie);
	return cookies['loggedIn'] ? true : false;
};

const ProtectedRoutes = () => {
	const { user } = useContext(Context);
	return checkAuth() && user ? <Outlet /> : <Login />;
};

const Router = () => {
	const { user } = useContext(Context);
	return (
		<>
			<Routes>
				<Route exact path="/" element={<Home />}></Route>
				<Route
					path="/login"
					element={user ? <Navigate to="/" /> : <Login />}
				></Route>
				<Route
					path="/register"
					element={user ? <Home /> : <Register />}
				></Route>
				<Route path="/posts/:id" element={<SinglePostDetails />}></Route>
				<Route element={<ProtectedRoutes />}>
					<Route path="/compose" element={<Compose />}></Route>
					<Route path="/profile" element={<Profile />}></Route>
				</Route>
			</Routes>
		</>
	);
};

export default Router;
