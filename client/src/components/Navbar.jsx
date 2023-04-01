import React, { useContext, useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Context } from '../context/Context';
import guitarPick from '../assets/guitar-pick.png';
import logo from '../assets/nfn2.png';
import defaultPic from '../assets/defaultAvatar.svg';
import Dropdown from './Dropdown';

const Navbar = ({ posts, setSearchResult }) => {
	const { user, dispatch } = useContext(Context);
	const publicFolder = `${import.meta.env.VITE_NFN_URI}/assets/`;
	const [openProfile, setOpenProfile] = useState(false);
	const [openNav, setOpenNav] = useState(false);
	const [showLogin, setShowLogin] = useState(false);
	const navigate = useNavigate();
	const { home } = useLocation();

	useEffect(() => {
		const handleSize = () => {
			if (window.innerWidth > 1075) {
				setOpenNav(false);
				setShowLogin(false);
			} else if (window.innerWidth < 1075) {
				setOpenNav(false);
				setShowLogin(true);
				setOpenProfile(false);
			}
		};
		window.addEventListener('resize', handleSize);
		return () => {
			window.removeEventListener('resize', handleSize);
		};
	}, []);

	const handleOpenProfile = (e) => {
		setOpenProfile(!openProfile);
	};

	const handleOpenNav = () => {
		setOpenNav(!openNav);
	};

	const handleSearch = (e) => {
		const target = e.target.value;
		if (!target) return setSearchResult(posts);

		const results = posts.filter(
			(post) =>
				post.title.toLowerCase().includes(target) ||
				post.title.includes(target) ||
				post.username.toLowerCase().includes(target) ||
				post.username.includes(target) ||
				post.description.toLowerCase().includes(target) ||
				post.description.includes(target) ||
				new Date(post.createdAt)
					.toLocaleDateString('en-US', {
						year: 'numeric',
						month: 'long',
						day: 'numeric',
					})
					.includes(target) ||
				new Date(post.createdAt)
					.toLocaleDateString('en-US', {
						year: 'numeric',
						month: 'long',
						day: 'numeric',
					})
					.toLowerCase()
					.includes(target)
		);
		setSearchResult(results);
	};

	const setDefault = (e) => {
		e.target.src = defaultPic;
	};

	const handleLogout = () => {
		dispatch({ type: 'LOGOUT' });
		window.location.reload(navigate('/'));
	};

	return (
		<div className=" w-full h-[70px] sticky top-0 z-10 flex items-center justify-between font-display bg-[#2a3d53] border-b-2 border-gray-100 border-opacity-30 ">
			<div className="flex items-center">
				<Link to="/">
					<div className="flex items-center justify-center ml-6">
						<div className="flex items-center gap-2 mr-6 sm:mr-6">
							<img
								src={guitarPick}
								alt="logo of a guitar pick"
								className="w-[40px] h-[40px]"
							/>
							<img
								src={logo}
								alt="logo text for Note For Note"
								className="w-[80px] sm:hidden"
							/>
						</div>
					</div>
				</Link>
				{location.pathname === '/' && user ? (
					<li className="flex mr-0 ">
						<div className="w-full relative">
							<input
								className=" border-gray-400 border-2 py-1 rounded-full px-4 outline-none"
								type="text"
								id="search"
								placeholder="Search..."
								autoFocus={true}
								onChange={handleSearch}
							/>
							<i className="fa-solid fa-magnifying-glass text-lg text-gray-400 ml-8 absolute top-1 right-4"></i>
						</div>
					</li>
				) : null}
			</div>
			<>
				<div className="lg:flex lg: items-center">
					{/* Hamburger Menu for Mobile Nav */}
					<div
						className="items-center text-center text-gray-100 text-xl h-[40px] bg-[#339999] rounded-md mr-6 hidden lg:flex lg:cursor-pointer"
						onClick={handleOpenNav}
					>
						{openNav ? (
							<i className="fa-solid fa-xmark w-[40px]"></i>
						) : (
							<i className="fa-solid fa-bars w-[40px]"></i>
						)}
					</div>
				</div>

				{/* Nav Links */}
				<ul
					className={
						'flex gap-8 mr-6 text-lg font-light cursor-pointer lg:pt-10 lg:fixed lg:top-[70px] lg:-right-[4%] lg:w-0 lg:overflow-x-hidden lg:flex-col lg:items-center lg:justify-start lg:gap-10 lg:bg-gray-400  lg:h-[90vh]  lg:text-center z-50 lg:transform lg:ease-in-out lg:duration-300 lg:bg-opacity-95 sm:-right-[7%]  ' +
						(openNav ? 'lg:w-[300px] sm:w-full' : 'lg:w-0 sm:w-0 ')
					}
				>
					<li>
						<Link to="/" onClick={() => setOpenNav(false)}>
							<i className="fa-solid fa-house text-gray-100 text-3xl lg:mr-8">
								{openNav ? (
									<span className=" font-title text-3xl ml-4">HOME</span>
								) : null}
							</i>
						</Link>
					</li>
					<li>
						<Link to="/compose" onClick={() => setOpenNav(false)}>
							<i className="fa-solid fa-pen-to-square  text-gray-100 text-3xl lg:mr-8 ">
								{openNav ? (
									<span className=" font-title text-3xl ml-4">WRITE</span>
								) : null}
							</i>
						</Link>
					</li>
					<li className="flex items-center ">
						{user ? (
							<>
								{openNav ? (
									<>
										<Link to="/profile" onClick={() => setOpenNav(false)}>
											<i className="fa-solid fa-user text-gray-100 text-3xl">
												<span className=" font-title text-3xl ml-4">
													PROFILE
												</span>
											</i>
										</Link>
									</>
								) : (
									<img
										src={publicFolder + user.profilePic}
										alt="user profile pic"
										className="w-[40px] h-[40px] rounded-full object-cover cursor-pointer relative z-20 lg:cursor-auto"
										onError={setDefault}
										onClick={openNav ? null : handleOpenProfile}
									/>
								)}
							</>
						) : (
							<ul className="flex gap-6 text-lg font-light text-gray-100 font-body cursor-pointer lg:flex-col lg:gap-10">
								<li className="bg-[#339999] px-3 py-1 rounded-md lg:bg-transparent lg:text-3xl lg:font-title lg:font-semibold">
									<Link to="/login" className="lg:flex">
										<i className="fa-solid fa-right-to-bracket hidden lg:block"></i>
										<span className="lg:uppercase lg:ml-4">Login</span>
									</Link>
								</li>
								<li className="bg-[#339999] px-3 py-1 rounded-md lg:bg-transparent lg:text-3xl lg:font-title lg:font-semibold">
									<Link to="/register" className="lg:flex">
										<i className="fa-solid fa-address-card hidden lg:block"></i>
										<span className="lg:uppercase lg:ml-4">Sign Up</span>
									</Link>
								</li>
							</ul>
						)}
					</li>
					{user ? (
						<li
							className="text-3xl text-gray-100 hidden lg:block "
							onClick={handleLogout}
						>
							<Link to="/profile">
								<i class="fa-solid fa-right-from-bracket text-gray-100 text-3xl">
									<span className=" font-title text-3xl ml-4">LOGOUT</span>
								</i>
							</Link>
						</li>
					) : null}
				</ul>
				{openProfile && (
					<>
						<button
							onClick={() => setOpenProfile(false)}
							className=" bg-slate-600 w-full h-full fixed top-0 left-0 opacity-80 cursor-default"
						></button>
						<Dropdown user={user} />
					</>
				)}
			</>
		</div>
	);
};

export default Navbar;
