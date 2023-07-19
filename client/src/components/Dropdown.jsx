import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Context } from '../context/Context';

const Dropdown = ({ setOpenProfile }) => {
	const { user, dispatch } = useContext(Context);
	const navigate = useNavigate();

	const handleLogout = () => {
		setOpenProfile(false);
		dispatch({ type: 'LOGOUT' });
		navigate('/');
	};

	return (
		<>
			<ul className="accent z-100 before:accent absolute top-16 right-4 mt-1 flex w-[12%] flex-col items-center gap-4 rounded-md px-2 py-4 text-white shadow-xl before:absolute before:-top-1 before:right-[12px] before:h-8 before:w-8 before:rotate-45 before:content-['']">
				<Link to="/profile">
					<li className=" hover:text-gray-200">Profile</li>
				</Link>
				<div className="flex w-full flex-col items-center pt-1">
					<li
						onClick={handleLogout}
						className="cursor-pointer hover:text-gray-200"
					>
						Sign Out
					</li>
					{user ? (
						<li className="mt-1 text-sm text-gray-100 text-opacity-60 ">
							{user.email}
						</li>
					) : null}
				</div>
			</ul>
		</>
	);
};

export default Dropdown;
