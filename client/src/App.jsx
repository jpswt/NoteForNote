import { BrowserRouter } from 'react-router-dom';
import Router from './router/Router';

function App() {
	return (
		<div className="">
			<BrowserRouter>
				<Router />
			</BrowserRouter>
		</div>
	);
}

export default App;
