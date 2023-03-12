import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Posts from '../components/Posts';
import Sidebar from '../components/Sidebar';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

const Home = () => {
	const [posts, setPosts] = useState([]);

	const idPath = useLocation();
	const id = idPath.search;
	// console.log(idPath);

	useEffect(() => {
		const fetchPosts = async () => {
			const response = await axios.get(`http://localhost:8000/posts/${id}`);
			setPosts(response.data);
			// console.log(response);
		};
		fetchPosts();
	}, [id]);

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
