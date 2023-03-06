import React from 'react';
import ComposePost from '../components/ComposePost';
import Sidebar from '../components/Sidebar';

const Compose = () => {
	return (
		<div>
			<div className="flex">
				<ComposePost />
				<Sidebar />
			</div>
		</div>
	);
};

export default Compose;
