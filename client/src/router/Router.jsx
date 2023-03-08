import { createBrowserRouter, Navigate, Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Compose from '../pages/Compose';
import Home from '../pages/Home';
import Login from '../pages/Login';
import Register from '../pages/Register';
import SinglePostDetails from '../pages/SinglePostDetails';
import Profile from '../pages/Profile';
import { Context } from '../context/Context';
import { useContext } from 'react';

const PageLayout = () => {
	const { user } = useContext(Context);
	return (
		<>
			<Navbar user={user} />
			{user ? <Outlet /> : <Navigate to="/register" />}
		</>
	);
};

const router = createBrowserRouter([
	{
		path: '/',
		element: <PageLayout />,
		children: [
			{
				path: '/',
				element: <Home />,
			},
			{
				path: '/compose',
				element: <Compose />,
			},
			{
				path: '/posts/:id',
				element: <SinglePostDetails />,
			},
			{
				path: '/profile',
				element: <Profile />,
			},
		],
	},
	{
		path: '/register',
		element: (
			<div>
				<Register />
			</div>
		),
	},
	{
		path: '/login',
		element: (
			<div>
				<Login />
			</div>
		),
	},
]);

export default router;
