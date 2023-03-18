import React, { useContext, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Context } from '../context/Context';
import logo from '../assets/logo.png';
import defaultPic from '../assets/default.jpeg';
import Dropdown from './Dropdown';

const Navbar = ({ posts, setSearchResult }) => {
	const { user, dispatch } = useContext(Context);
	const publicFolder = 'http://localhost:8000/assets/';
	const [openProfile, setOpenProfile] = useState(false);

	const { home } = useLocation();

	const handleOpenProfile = (e) => {
		setOpenProfile(!openProfile);
	};

	const handleSearch = (e) => {
		const target = e.target.value;
		if (!target) return setSearchResult(posts);

		const results = posts.filter(
			(post) =>
				post.title.includes(target) ||
				post.title.includes(target.toUpperCase()) ||
				post.description.includes(target) ||
				post.description.includes(target.toUpperCase())
		);
		setSearchResult(results);
	};

	const setDefault = (e) => {
		e.target.src = defaultPic;
	};

	return (
		<div className=" w-full h-[70px] sticky top-0 z-10 flex items-center justify-between font-display bg-gray-600 border-b-2 border-gray-100 border-opacity-30 ">
			{/* <div className="flex content-center">logo</div> */}
			<div className="flex items-center justify-center ml-6">
				<div className="flex items-center gap-2 mr-4">
					<img src={logo} alt="" className="w-[40px] h-[40px]" />
					<p className=" font-title text-lg text-gray-100">Guitar Blog</p>
				</div>
				{location.pathname === '/home' ? (
					<div className="flex">
						<div className="w-full relative">
							<input
								className=" border-gray-400 border-2 py-1 rounded-full px-4 outline-none"
								type="text"
								id="search"
								placeholder="Search Blogs..."
								autoFocus={true}
								onChange={handleSearch}
							/>
							<i className="fa-solid fa-magnifying-glass text-lg text-gray-400 ml-8 absolute top-1 right-4"></i>
						</div>
					</div>
				) : null}
			</div>
			<div className="flex items-center gap-6 mr-6">
				<div>
					<ul className="flex gap-8 text-lg font-light cursor-pointer">
						<li>
							{/* <Link to="/home">HOME</Link> */}
							<Link to="/home">
								<i className="fa-solid fa-house text-gray-100 text-3xl"></i>
							</Link>
						</li>
						<li>
							<Link to="/compose">
								<i className="fa-solid fa-pen-to-square  text-gray-100 text-3xl "></i>
							</Link>
							{/* <Link to="/compose">COMPOSE</Link> */}
						</li>
						{/* <li onClick={handleLogout}>{user && 'LOGOUT'}</li> */}
					</ul>
					{openProfile && (
						<>
							<button
								onClick={() => setOpenProfile(false)}
								className=" bg-gray-600 w-full h-full fixed top-0 left-0 opacity-80 cursor-default"
							></button>
							<Dropdown user={user} />
						</>
					)}
				</div>
				<div className="">
					{user && (
						<img
							src={publicFolder + user.profilePic}
							alt=""
							className="w-[40px] h-[40px] rounded-full object-cover cursor-pointer relative z-20"
							onError={setDefault}
							onClick={handleOpenProfile}
						/>
					)}
					{/* {user ? (
						<Link to="/profile">
							<img
								src={publicFolder + user.profilePic}
								alt=""
								className="w-[40px] h-[40px] rounded-full object-cover cursor-pointer"
								onError={setDefault}
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
					)} */}
				</div>
			</div>
		</div>
	);
};

export default Navbar;
