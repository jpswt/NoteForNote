import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Posts from '../components/Posts';
import Sidebar from '../components/Sidebar';
import axios from 'axios';
import { useLocation } from 'react-router';

const Home = () => {
	const [posts, setPosts] = useState([]);

	const { search } = useLocation();
	console.log(location);

	useEffect(() => {
		const fetchPosts = async () => {
			const response = await axios.get(
				`http://localhost:8000/posts/home${search}`
			);
			setPosts(response.data);
			// console.log(response);
		};
		fetchPosts();
	}, [search]);

	return (
		<>
			<Header />
			<div className="flex">
				<Posts posts={posts} />
				<Sidebar />
			</div>
		</>
	);
};

export default Home;
