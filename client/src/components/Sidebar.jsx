import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import defaultPic from '../assets/defaultAvatar.svg';
import { Context } from '../context/Context';

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
		<div className="flex-4 font-body border-l-2 border-gray-500 text-gray-100 min-h-screen">
			<div className=" bg-[#2a3d53] flex flex-col items-center sticky w-full">
				<div className="flex flex-col items-center pb-2 mb-10 w-[60%]">
					{!user ? null : !post ? (
						<>
							<span className="m-2 mt-10 p-1 w-[100%] border-solid border-b-2 border-gray-400 font-semibold text-center text-lg font-title">
								ABOUT ME
							</span>
							<img
								className="w-[125px] h-[125px] rounded-full border-opacity-0 mt-6 shadow-lg object-cover overflow-hidden "
								src={publicFolder + user?.profilePic}
								alt=""
								onError={setDefault}
							/>
							{user.about ? (
								<p className="px-12 py-6">{user.about}</p>
							) : (
								// <p className="px-12 py-6">Add a Bio</p>
								<Link to="/profile">
									<button className="accent text-white px-4 py-2 rounded-md mt-6 ">
										Add a Bio
									</button>
								</Link>
							)}
						</>
					) : (
						<>
							<span className="m-2 mt-10 p-1 w-[100%] border-solid border-b-2 border-gray-400 font-semibold text-center text-lg font-title">
								ABOUT ME
							</span>
							<img
								className="w-[125px] h-[125px] rounded-full mt-6 object-cover "
								src={publicFolder + post?.profilePic}
								alt=""
								onError={setDefault}
							/>
							<p> </p>
							<p className="mt-2">{post.username}</p>
							<p className="px-12 py-6">{post.about}</p>
						</>
					)}
				</div>
				<div className="flex flex-col items-center w-[60%]">
					<span className="m-2 mt-0 p-1 w-[100%] border-solid border-b-2 border-gray-400 font-semibold text-center text-lg font-title">
						DISCOVER YOUR INTERESTS
					</span>

					<ul className=" text-lg flex-2 mb-8 mt-2 ">
						{categories.map((category, i) => (
							<li
								key={category._id}
								className=" inline-block w-[50%] px-8 cursor-pointer mt-2 "
								onClick={handleScroll}
							>
								<Link to={`/?category=${category.name}`}>{category.name}</Link>
							</li>
						))}
					</ul>
				</div>
			</div>
		</div>
	);
};

export default Sidebar;
