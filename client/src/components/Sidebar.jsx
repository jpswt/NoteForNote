import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import defaultPic from '../assets/default.jpeg';
import { Context } from '../context/Context';

const Sidebar = ({ posts, post }) => {
	const { user } = useContext(Context);
	const publicFolder = 'http://localhost:8000/assets/';

	const [categories, setCategories] = useState([]);
	console.log(posts);
	console.log(post);
	console.log(user);

	const handleScroll = () => {
		window.scrollTo(0, 360);
	};

	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

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
		<div className="flex-3 mx-4 rounded-md bg-stone-100 flex flex-col items-center font-body h-[800px] sticky top-0">
			<div className="flex flex-col items-center">
				<span className="m-2 p-1 w-[80%] border-solid border-b-2 border-stone-300  font-semibold text-center">
					ABOUT ME
				</span>
				{!post ? (
					<img
						className="w-[125px] h-[125px] rounded-full mt-2 "
						src={publicFolder + user.profilePic}
						alt=""
						onError={setDefault}
					/>
				) : (
					<img
						className="w-[125px] h-[125px] rounded-full mt-2 "
						src={publicFolder + post.profilePic}
						alt=""
						onError={setDefault}
					/>
				)}

				<p className="px-12 py-6">{user.about}</p>
			</div>
			<div className="flex flex-col items-center w-full">
				<span className="m-2 p-1 w-[80%] border-solid border-b-2 border-stone-300 font-semibold text-center">
					CATEGORIES
				</span>

				<ul className=" text-center flex flex-wrap mb-8">
					{categories.map((category, i) => (
						<li
							key={i}
							className=" inline-block w-1/2 cursor-pointer "
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
	);
};

export default Sidebar;
