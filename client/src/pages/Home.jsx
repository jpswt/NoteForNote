import React from 'react';
import Header from '../components/Header';
import Posts from '../components/Posts';
import Sidebar from '../components/Sidebar';

const Home = () => {
	return (
		<>
			<Header />
			<div className="flex">
				<Posts />
				<Sidebar />
			</div>
		</>
	);
};

export default Home;
