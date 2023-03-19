import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import defaultPic from '../assets/default.jpeg';
import { Context } from '../context/Context';

const Sidebar = ({ posts, post }) => {
	const { user } = useContext(Context);
	const publicFolder = 'http://localhost:8000/assets/';

	const [categories, setCategories] = useState([]);
	// console.log(posts);
	// console.log(post);
	// console.log(user);

	const handleScroll = () => {
		window.scrollTo(0, 0);
	};

	// useEffect(() => {
	// 	window.scrollTo(0, 0);
	// }, []);

	useEffect(() => {
		const fetchCategories = async () => {
			const response = await axios.get('http://localhost:8000/categories');
			setCategories(response.data);
		};
		fetchCategories();
	}, []);

	const setDefault = (e) => {
		e.target.src = defaultPic;
	};

	return (
		<div className="font-body border-l-2 border-stone-100 border-opacity-20 text-gray-100 min-h-full">
			<div className="flex-4 bg-gray-600 flex flex-col items-center sticky w-full ">
				<div className="flex flex-col items-center pb-2 mt-10 mb-10 w-[70%] border-2 border-gray-400">
					<span className="m-2 mt-0 p-1 w-[100%] border-solid border-b-2 border-gray-400 bg-teal-600  font-semibold text-center">
						ABOUT ME
					</span>
					{!post ? (
						<>
							<img
								className="w-[125px] h-[125px] rounded-full mt-6 shadow-lg object-cover "
								src={publicFolder + user.profilePic}
								alt=""
								onError={setDefault}
							/>
							{user.about ? (
								<p className="px-12 py-6">{user.about}</p>
							) : (
								// <p className="px-12 py-6">Add a Bio</p>
								<Link to="/profile">
									<button className="bg-teal-600 text-white px-4 py-2 rounded-md mt-6 ">
										Add a Bio
									</button>
								</Link>
							)}
						</>
					) : (
						<>
							<img
								className="w-[125px] h-[125px] rounded-full mt-6 shadow-lg object-cover "
								src={publicFolder + post.profilePic}
								alt=""
								onError={setDefault}
							/>
							<p> </p>
							<p className="">{post.username}</p>
							<p className="px-12 py-4">{post.about}</p>
						</>
					)}
				</div>
				<div className="flex flex-col items-center w-[70%] mt-10 border-2 border-gray-400 ">
					<span className="m-2 mt-0 p-1 w-[100%] border-solid border-b-2 border-gray-400 font-semibold text-center bg-teal-600">
						CATEGORIES
					</span>

					<ul className=" text-center text-lg flex flex-wrap mb-8 items-center justify-center ">
						{categories.map((category, i) => (
							<li
								key={i}
								className=" inline-block w-[40%] cursor-pointer "
								onClick={handleScroll}
							>
								<Link to={`/home?category=${category.name}`}>
									{category.name}
								</Link>
							</li>
						))}
					</ul>
				</div>
				<div className="flex flex-col items-center w-[70%] mt-10 border-2 border-gray-400 ">
					<span className="m-2 mt-0 p-1 w-[100%] border-solid border-b-2 border-gray-400 font-semibold text-center bg-teal-600">
						CATEGORIES
					</span>

					<ul className=" text-center text-lg flex flex-wrap mb-8 items-center justify-center ">
						{categories.map((category, i) => (
							<li
								key={i}
								className=" inline-block w-[40%] cursor-pointer "
								onClick={handleScroll}
							>
								<Link to={`/home?category=${category.name}`}>
									{category.name}
								</Link>
							</li>
						))}
					</ul>
				</div>
			</div>
		</div>
	);
};

export default Sidebar;
