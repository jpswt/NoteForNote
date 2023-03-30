import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Context } from '../context/Context';
import cookie from 'cookie';

const Dropdown = () => {
	const { user, dispatch } = useContext(Context);
	const navigate = useNavigate();

	const handleLogout = () => {
		document.cookie = cookie.serialize('loggedIn=', false, { maxAge: 0 });
		dispatch({ type: 'LOGOUT' });
		window.location.reload(navigate('/'));
	};

	return (
		<>
			<ul className="flex flex-col items-center w-[12%] accent rounded-md text-white mt-1 px-2 py-4 gap-4 absolute top-16 right-4 z-100 shadow-xl before:content-[''] before:absolute before:-top-1 before:right-[12px] before:w-8 before:h-8 before:accent before:rotate-45">
				<Link to="/profile">
					<li className=" hover:text-gray-200">Profile</li>
				</Link>
				<div className="flex flex-col items-center pt-1 w-full">
					<li
						onClick={handleLogout}
						className="hover:text-gray-200 cursor-pointer"
					>
						Sign Out
					</li>
					{user ? (
						<li className="text-sm mt-1 text-gray-100 text-opacity-60 ">
							{user.email}
						</li>
					) : null}
				</div>
			</ul>
		</>
	);
};

export default Dropdown;
