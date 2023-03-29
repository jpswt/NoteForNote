import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import defaultPic from '../assets/defaultAvatar.svg';
import { Context } from '../context/Context';
import StickyBox from 'react-sticky-box';

const Sidebar = ({ post, categories }) => {
	const { user } = useContext(Context);
	const publicFolder = 'http://localhost:8000/assets/';

	const handleScroll = () => {
		window.scrollTo(0, 0);
	};

	const setDefault = (e) => {
		e.target.src = defaultPic;
	};

	return (
		<div className="flex-4 font-body border-l-2 border-gray-500 text-gray-100 min-h-screen lg:min-h-full lg:border-l-0">
			<StickyBox offsetTop={70} offsetBottom={150}>
				<div className=" bg-[#2a3d53] flex flex-col items-center w-full">
					<div className="flex flex-col items-center pb-2 mb-10 w-[60%] h-full lg:w-full lg:mb-0 lg:pb-0">
						{!user ? null : !post ? (
							<div className="flex flex-col items-center w-60% lg:hidden">
								<span className="m-2 mt-10 p-1 w-[100%] border-solid border-b-2 border-gray-500 font-semibold text-center text-lg font-title">
									ABOUT ME
								</span>
								<img
									className="w-[125px] h-[125px] rounded-full border-opacity-0 mt-6 shadow-lg object-cover overflow-hidden "
									src={publicFolder + user?.profilePic}
									alt=""
									onError={setDefault}
								/>
								<Link to={`/?user=${user.username}`}>
									<p className="mt-3 text-lg font-semibold bg-[#339999] px-4 rounded-full hover:bg-opacity-70 hover:text-gray-200">
										{user.username}
									</p>
								</Link>
								{user.about ? (
									<p className="px-12 pt-2 pb-6">{user.about}</p>
								) : (
									<Link to="/profile">
										<button className="accent text-white px-4 py-2 rounded-md mt-6 ">
											Add a Bio
										</button>
									</Link>
								)}
							</div>
						) : (
							<div className="flex flex-col items-center w-[100%] ">
								<span className="m-2 mt-10 p-1 w-[100%] border-solid border-b-2 border-gray-500 font-semibold text-center text-lg font-title lg:border-t-2 lg:border-b-0 lg:pt-4 lg:mt-0">
									POSTED BY
								</span>
								<img
									className="w-[125px] h-[125px] rounded-full mt-6 object-cover "
									src={publicFolder + post?.profilePic}
									alt=""
									onError={setDefault}
								/>
								<Link to={`/?user=${post.username}`}>
									<p className="mt-3 text-lg font-semibold bg-[#339999] px-4 rounded-full hover:bg-opacity-70 hover:text-gray-200">
										{post.username}
									</p>
								</Link>
								<p className="px-12 pt-2 pb-6">{post.about}</p>
							</div>
						)}
					</div>
					<div className="flex flex-col flex-wrap items-center w-[60%] lg:w-[75%] lg:hidden">
						<span className="my-2 mt-0 p-1 w-[100%] border-solid border-b-2 border-gray-400 font-semibold text-center text-lg font-title ">
							DISCOVER YOUR INTERESTS
						</span>

						<ul className=" text-lg flex-2 mb-8 mt-2 lg:flex lg:flex-2 lg:flex-wrap lg:justify-start lg:ml-4">
							{categories.map((category, i) => (
								<li
									key={category._id}
									className="inline-block w-1/2 px-9 cursor-pointer mt-2 xl:w-[48%] xl:px-5 "
									onClick={handleScroll}
								>
									<Link to={`/?category=${category.name}`}>
										{category.name}
									</Link>
								</li>
							))}
						</ul>
					</div>
					<div className="flex flex-col w-[60%] mt-10 mb-20 lg:w-[100%] lg:mb-4 lg:mt-0">
						<span className="my-2 mt-0 p-1 w-[100%] border-solid border-b-2 border-gray-500 font-semibold text-center text-lg font-title lg:border-t-2 lg:border-b-0 lg:pt-4 lg:mb-0">
							FOLLOW US
						</span>
						<div className="flex ml-2 items-center justify-center gap-4 mt-4 lg:mt-0">
							<i class="fa-brands fa-facebook text-3xl "></i>
							<i class="fa-brands fa-instagram text-3xl "></i>
							<i class="fa-brands fa-twitter text-3xl "></i>
							<i class="fa-brands fa-youtube text-3xl "></i>
						</div>
					</div>
				</div>
			</StickyBox>
		</div>
	);
};

export default Sidebar;
