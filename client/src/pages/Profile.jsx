import React from 'react';
import Navbar from '../components/Navbar';
import ProfileComp from '../components/Profile';

const Profile = () => {
	return (
		<div>
			<Navbar />
			<div className="flex w-screen">
				<ProfileComp />
			</div>
		</div>
	);
};

export default Profile;
