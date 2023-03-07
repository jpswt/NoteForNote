import React from 'react';
import PostDetails from '../components/PostDetails';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';

const SinglePostDetails = () => {
	return (
		<div>
			<div className="flex">
				<PostDetails />
				<Sidebar />
			</div>
		</div>
	);
};

export default SinglePostDetails;
