import React from 'react';
import Navbar from '../components/Navbar';
import Settings from '../components/Settings';
import Sidebar from '../components/Sidebar';

const Profile = () => {
	return (
		<div>
			<Navbar />
			<div className="flex">
				<Settings />
			</div>
		</div>
	);
};

export default Profile;
