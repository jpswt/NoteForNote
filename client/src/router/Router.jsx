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
	return checkAuth() && user ? <Outlet /> : <Navigate to="/login" />;
};

const Router = () => {
	const { user, dispatch } = useContext(Context);
	return (
		<>
			{/* <Navbar user={{ user, dispatch }} /> */}
			<Routes>
				{/* <Route exact path="/" element={user ? <Home /> : <Login />}></Route> */}
				<Route
					path="/login"
					element={user ? <Navigate to="/home" /> : <Login />}
				></Route>
				<Route
					path="/register"
					element={user ? <Home /> : <Register />}
				></Route>
				<Route element={<ProtectedRoutes />}>
					<Route path="/home" element={<Home />}></Route>
					<Route path="/compose" element={<Compose />}></Route>
					<Route path="/posts/:id" element={<SinglePostDetails />}></Route>
					<Route path="/profile" element={<Profile />}></Route>
				</Route>
			</Routes>
		</>
	);
};
// const PageLayout = () => {
// 	const { user } = useContext(Context);
// 	return (
// 		<>
// 			<Navbar user={user} />
// 			{user ? <Outlet /> : <Navigate to="/register" />}
// 		</>
// 	);
// };

// const router = createBrowserRouter([
// 	{
// 		path: '/',
// 		element: <PageLayout />,
// 		children: [
// 			{
// 				path: '/',
// 				element: <Home />,
// 			},
// 			{
// 				path: '/compose',
// 				element: <Compose />,
// 			},
// 			{
// 				path: '/posts/:id',
// 				element: <SinglePostDetails />,
// 			},
// 			{
// 				path: '/profile',
// 				element: <Profile />,
// 			},
// 		],
// 	},
// 	{
// 		path: '/register',
// 		element: (
// 			<div>
// 				<Register />
// 			</div>
// 		),
// 	},
// 	{
// 		path: '/login',
// 		element: (
// 			<div>
// 				<Login />
// 			</div>
// 		),
// 	},
// ]);

export default Router;
