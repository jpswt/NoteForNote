import Navbar from './components/Navbar';
import Compose from './pages/Compose';
import Home from './pages/Home';
import SinglePostDetails from './pages/SinglePostDetails';
import Profile from './pages/Profile';
import Login from './pages/Login';

function App() {
	return (
		<div className="">
			<Navbar />
			{/* <Profile /> */}
			<Login />
		</div>
	);
}

export default App;
