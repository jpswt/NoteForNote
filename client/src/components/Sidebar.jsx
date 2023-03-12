import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Sidebar = () => {
	const [categories, setCategories] = useState([]);

	useEffect(() => {
		const fetchCategories = async () => {
			const response = await axios.get('http://localhost:8000/categories');
			setCategories(response.data);
		};
		fetchCategories();
	}, []);

	return (
		<div className="flex-3 mx-4 rounded-md bg-stone-100 flex flex-col items-center font-body h-[800px] sticky top-0">
			<div className="flex flex-col items-center">
				<span className="m-2 p-1 w-[80%] border-solid border-b-2 border-stone-300  font-semibold text-center">
					ABOUT ME
				</span>
				<img
					className="w-[70%] mt-2"
					src="https://images.unsplash.com/photo-1629055871644-7867e4b11f14?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1548&q=80"
					alt=""
				/>
				<p className="px-12 py-6">
					Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt quam
					eligendi rerum exercitationem doloribus veritatis iste dolor amet illo
					alias quibusdam veniam numquam, harum, obcaecati minima at tenetur
					eius labore ipsam, id molestias voluptatibus vero!
				</p>
			</div>
			<div className="flex flex-col items-center w-full">
				<span className="m-2 p-1 w-[80%] border-solid border-b-2 border-stone-300 font-semibold text-center">
					CATEGORIES
				</span>

				<ul className=" text-center flex gap-8 mb-8">
					{categories.map((category, i) => (
						<li key={i} className=" inline-block w-1/2 cursor-pointer ">
							<Link to={`/?category=${category.name}`}>{category.name}</Link>
						</li>
					))}
				</ul>
			</div>
		</div>
	);
};

export default Sidebar;
