import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = ({ user }) => {
	return (
		<div className=" w-full h-[50px] sticky top-0 z-10 flex items-center justify-between font-display bg-stone-200">
			{/* <div className="flex content-center">logo</div> */}
			<div className="flex items-center content-center mx-8">
				<ul className="flex gap-8 text-lg font-light text-stone-800 cursor-pointer">
					<li>
						<Link to="/">HOME</Link>
					</li>
					<li>
						<Link to="">ABOUT</Link>
					</li>
					<li>CONTACT</li>
					<li>
						<Link to="/compose">COMPOSE</Link>
					</li>
					<li>{user && 'LOGOUT'}</li>
				</ul>
			</div>
			<div className="flex items-center content-center mr-4">
				{user ? (
					<Link to="/profile">
						<img
							src="https://images.pexels.com/photos/2325446/pexels-photo-2325446.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
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
