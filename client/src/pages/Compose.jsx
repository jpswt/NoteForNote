import React from 'react';
import ComposePost from '../components/ComposePost';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';

const Compose = () => {
	return (
		<div>
			<Navbar />
			<div className="flex w-screen">
				<ComposePost />
				<Sidebar />
			</div>
		</div>
	);
};

export default Compose;
