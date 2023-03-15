import React, { useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Context } from '../context/Context';
import logo from '../assets/logo.png';

const Navbar = ({ posts, setSearchResult }) => {
	const { user, dispatch } = useContext(Context);
	const publicFolder = 'http://localhost:8000/assets/';

	const { home } = useLocation();
	console.log(location.pathname);

	const handleLogout = () => {
		dispatch({ type: 'LOGOUT' });
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

	return (
		<div className=" w-full h-[70px] sticky top-0 z-10 flex items-center justify-between font-display bg-stone-50">
			{/* <div className="flex content-center">logo</div> */}
			<div className="flex items-center justify-center">
				<div className="flex items-center gap-2 mr-4">
					<img src={logo} alt="" className="w-[40px] h-[40px]" />
					<p className=" font-title text-lg">Guitar Blog</p>
				</div>
				{location.pathname === '/home' ? (
					<div className="flex">
						<div className="w-full relative">
							<input
								className=" border-gray-300 border-2 py-1 rounded-full px-4 outline-none"
								type="text"
								id="search"
								placeholder="Search Blogs..."
								autoFocus={true}
								onChange={handleSearch}
							/>
							<i className="fa-solid fa-magnifying-glass text-lg text-stone-300 ml-8 absolute top-1 right-4"></i>
						</div>
					</div>
				) : null}
			</div>
			<div className="flex items-center gap-6 mr-4">
				<div>
					<ul className="flex gap-8 text-lg font-light text-stone-800 cursor-pointer">
						<li>
							<Link to="/home">HOME</Link>
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
				<div className="">
					{user ? (
						<Link to="/profile">
							<img
								src={
									publicFolder + user.profilePic
									// ? publicFolder + user.profilePic
									// : publicFolder + 'default.jpeg'
								}
								alt=""
								className="w-[40px] h-[40px] rounded-full object-cover cursor-pointer"
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
				</div>
			</div>
		</div>
	);
};

export default Navbar;
