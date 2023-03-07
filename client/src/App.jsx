import { RouterProvider } from 'react-router-dom';
import router from './router/Router';

// import Navbar from './components/Navbar';
// import Compose from './pages/Compose';
// import Home from './pages/Home';
// import SinglePostDetails from './pages/SinglePostDetails';
// import Profile from './pages/Profile';
// import Login from './pages/Login';
// import Register from './pages/Register';

function App() {
	return (
		<div className="">
			<RouterProvider router={router} />
		</div>
	);
}

export default App;
