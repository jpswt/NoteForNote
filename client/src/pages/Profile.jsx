import React from 'react';
import Navbar from '../components/Navbar';
import Settings from '../components/Profile';
import Sidebar from '../components/Sidebar';

const Profile = () => {
	return (
		<div>
			<Navbar />
			<div className="flex w-screen">
				<Settings />
				{/* <Sidebar /> */}
			</div>
		</div>
	);
};

export default Profile;
