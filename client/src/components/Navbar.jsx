import React, { useContext, useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Context } from '../context/Context';
import { storage } from '../firebase/firebase';
import { getStorage, ref, getDownloadURL } from 'firebase/storage';
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
	const [profileURL, setProfileURL] = useState(null);
	const navigate = useNavigate();
	const { home } = useLocation();
	const defaultImg = new URL(defaultPic, import.meta.url).href;

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

	useEffect(() => {
		if (user) {
			const getProfile = async () => {
				const storage = getStorage();
				let imageRef = ref(storage, user?.profilePic);
				await getDownloadURL(imageRef).then((res) => {
					setProfileURL(res);
				});
			};
			getProfile();
		}
	}, []);

	const handleOpenProfile = (e) => {
		setOpenProfile(!openProfile);
	};

	const handleOpenNav = () => {
		setOpenNav(!openNav);
	};

	const handleSearch = (e) => {
		const target = e.target.value.toLowerCase();
		if (!target) return setSearchResult(posts);

		const results = posts.filter(
			(post) =>
				post.title.toLowerCase().includes(target) ||
				post.username.toLowerCase().includes(target) ||
				post.description.toLowerCase().includes(target) ||
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
		e.target.src = defaultImg;
	};

	const handleLogout = () => {
		dispatch({ type: 'LOGOUT' });
		window.location.reload(navigate('/'));
	};

	return (
		<div className=" sticky top-0 z-10 flex h-[70px] w-full items-center justify-between border-b-2 border-gray-100 border-opacity-30 bg-[#2a3d53] font-display ">
			<div className="flex items-center">
				<Link to="/">
					<div className="ml-6 flex items-center justify-center">
						<div className="mr-6 flex items-center gap-2 sm:mr-6">
							<img
								src={guitarPick}
								alt="logo of a guitar pick"
								className="h-[40px] w-[40px]"
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
					<li className="mr-0 flex ">
						<div className="relative w-full">
							<input
								className=" rounded-full border-2 border-gray-400 py-1 px-4 outline-none"
								type="text"
								id="search"
								placeholder="Search..."
								autoFocus={true}
								onChange={handleSearch}
							/>
							<i className="fa-solid fa-magnifying-glass absolute top-1 right-4 ml-8 text-lg text-gray-400"></i>
						</div>
					</li>
				) : null}
			</div>
			<>
				<div className="lg: items-center lg:flex">
					{/* Hamburger Menu for Mobile Nav */}
					<div
						className="mr-6 hidden h-[40px] items-center rounded-md bg-[#339999] text-center text-xl text-gray-100 lg:flex lg:cursor-pointer"
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
						'z-50 mr-6 flex cursor-pointer gap-8 text-lg font-light lg:fixed lg:top-[70px] lg:-right-[4%] lg:h-[90vh] lg:w-0 lg:transform lg:flex-col lg:items-center lg:justify-start lg:gap-10  lg:overflow-x-hidden  lg:bg-gray-400 lg:bg-opacity-95 lg:pt-10 lg:text-center lg:duration-300 lg:ease-in-out sm:-right-[7%]  ' +
						(openNav ? 'lg:w-[300px] sm:w-full' : 'lg:w-0 sm:w-0 ')
					}
				>
					<li>
						<Link to="/" onClick={() => setOpenNav(false)}>
							<i className="fa-solid fa-house text-3xl text-gray-100 lg:mr-8">
								{openNav ? (
									<span className=" ml-4 font-title text-3xl">HOME</span>
								) : null}
							</i>
						</Link>
					</li>
					<li>
						<Link to="/compose" onClick={() => setOpenNav(false)}>
							<i className="fa-solid fa-pen-to-square  text-3xl text-gray-100 lg:mr-8 ">
								{openNav ? (
									<span className=" ml-4 font-title text-3xl">WRITE</span>
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
											<i className="fa-solid fa-user text-3xl text-gray-100">
												<span className=" ml-4 font-title text-3xl">
													PROFILE
												</span>
											</i>
										</Link>
									</>
								) : (
									<img
										src={profileURL || defaultImg}
										alt=""
										className="relative z-20 h-[40px] w-[40px] cursor-pointer rounded-full object-cover lg:cursor-auto"
										onError={defaultImg}
										onClick={openNav ? null : handleOpenProfile}
									/>
								)}
							</>
						) : (
							<ul className="flex cursor-pointer gap-6 font-body text-lg font-light text-gray-100 lg:flex-col lg:gap-10">
								<li className="rounded-md bg-[#339999] px-3 py-1 lg:bg-transparent lg:font-title lg:text-3xl lg:font-semibold">
									<Link to="/login" className="lg:flex">
										<i className="fa-solid fa-right-to-bracket hidden lg:block"></i>
										<span className="lg:ml-4 lg:uppercase">Login</span>
									</Link>
								</li>
								<li className="rounded-md bg-[#339999] px-3 py-1 lg:bg-transparent lg:font-title lg:text-3xl lg:font-semibold">
									<Link to="/register" className="lg:flex">
										<i className="fa-solid fa-address-card hidden lg:block"></i>
										<span className="lg:ml-4 lg:uppercase">Sign Up</span>
									</Link>
								</li>
							</ul>
						)}
					</li>
					{user ? (
						<li
							className="hidden text-3xl text-gray-100 lg:block "
							onClick={handleLogout}
						>
							<Link to="/profile">
								<i className="fa-solid fa-right-from-bracket text-3xl text-gray-100">
									<span className=" ml-4 font-title text-3xl">LOGOUT</span>
								</i>
							</Link>
						</li>
					) : null}
				</ul>
				{openProfile && (
					<>
						<button
							onClick={() => setOpenProfile(false)}
							className=" fixed top-0 left-0 h-full w-full cursor-default bg-slate-600 opacity-80"
						></button>
						<Dropdown user={user} setOpenProfile={setOpenProfile} />
					</>
				)}
			</>
		</div>
	);
};

export default Navbar;
