import { createBrowserRouter, Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Compose from '../pages/Compose';
import Home from '../pages/Home';
import Login from '../pages/Login';
import Register from '../pages/Register';
import SinglePostDetails from '../pages/SinglePostDetails';
import Profile from '../pages/Profile';

const PageLayout = () => {
	return (
		<>
			<Navbar />
			<Outlet />
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
