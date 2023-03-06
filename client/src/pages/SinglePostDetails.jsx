import React from 'react';
import PostDetails from '../components/PostDetails';
import Sidebar from '../components/Sidebar';

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
