import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Context } from '../context/Context';
import cookie from 'cookie';

const Dropdown = () => {
	const { user, dispatch } = useContext(Context);

	const handleLogout = () => {
		document.cookie = cookie.serialize('loggedIn', null, { maxAge: 0 });
		dispatch({ type: 'LOGOUT' });
	};

	return (
		<div>
			<ul className="flex flex-col items-center w-[15%] bg-gray-500 text-white px-4 py-4 gap-4 absolute top-16 right-6 ">
				<Link to="/profile">
					<li className=" hover:text-gray-200">Profile</li>
				</Link>
				<div className="flex flex-col items-center">
					<li
						onClick={handleLogout}
						className="hover:text-gray-200 cursor-pointer"
					>
						Sign Out
					</li>
					<li className="text-sm">{user.email}</li>
				</div>
			</ul>
		</div>
	);
};

export default Dropdown;
