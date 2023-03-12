import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Context } from '../context/Context';

const Navbar = () => {
	const { user, dispatch } = useContext(Context);

	const handleLogout = () => {
		dispatch({ type: 'LOGOUT' });
	};
	return (
		<div className=" w-full h-[50px] sticky top-0 z-10 flex items-center justify-between font-display bg-stone-50">
			{/* <div className="flex content-center">logo</div> */}
			<div className="flex items-center content-center mx-8">
				<ul className="flex gap-8 text-lg font-light text-stone-800 cursor-pointer">
					<li>
						<Link to="/dashboard">HOME</Link>
					</li>
					<li>
						<Link to="">ABOUT</Link>
					</li>
					<li>CONTACT</li>
					<li>
						<Link to="/compose">COMPOSE</Link>
					</li>
					<li onClick={handleLogout}>{user && 'LOGOUT'}</li>
				</ul>
			</div>
			<div className="flex items-center content-center mr-4">
				{user ? (
					<Link to="/profile">
						<img
							src={
								user.profilePic ||
								'https://images.pexels.com/photos/165971/pexels-photo-165971.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
							}
							alt=""
							className="w-[40px] h-[40px] rounded-full object-cover"
						/>
					</Link>
				) : (
					<ul className="flex gap-8 text-lg font-light text-stone-800 cursor-pointer">
						<li>
							<Link to="/login">LOGIN</Link>{' '}
						</li>
						<li>
							<Link to="/register">REGISTER</Link>{' '}
						</li>
					</ul>
				)}
				<i className="fa-solid fa-magnifying-glass text-lg text-stone-800 ml-8 "></i>
			</div>
		</div>
	);
};

export default Navbar;
