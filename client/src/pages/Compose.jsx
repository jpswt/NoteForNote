import React, { useState, useEffect } from 'react';
import ComposePost from '../components/ComposePost';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import axios from 'axios';

const Compose = () => {
	const [categories, setCategories] = useState([]);
	const [isLoaded, setIsLoaded] = useState(false);

	useEffect(() => {
		const fetchCategories = async () => {
			const response = await axios.get(
				`${import.meta.env.VITE_NFN_URI}/categories`
			);
			setCategories(response.data);
			setIsLoaded(true);
		};
		fetchCategories();
	}, []);

	if (!isLoaded) {
		<></>;
	} else
		return (
			<div>
				<Navbar />
				<div className="flex lg:flex-col lg:w-[100%]">
					<ComposePost categories={categories} />
					<Sidebar categories={categories} />
				</div>
			</div>
		);
};

export default Compose;
