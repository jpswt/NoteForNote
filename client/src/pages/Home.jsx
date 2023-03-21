import React, { useState, useEffect, useContext } from 'react';
import Header from '../components/Header';
import Posts from '../components/Posts';
import Sidebar from '../components/Sidebar';
import axios from 'axios';
import { useLocation } from 'react-router';
import Navbar from '../components/Navbar';
import { Context } from '../context/Context';

const Home = () => {
	const { user, dispatch } = useContext(Context);
	const [posts, setPosts] = useState([]);
	const [searchResult, setSearchResult] = useState([]);

	const { search } = useLocation();
	console.log(location);

	useEffect(() => {
		const fetchPosts = async () => {
			const response = await axios.get(`http://localhost:8000/posts/${search}`);
			setPosts(response.data);
			setSearchResult(response.data);
			// console.log(response);
		};
		fetchPosts();
	}, [search]);

	return (
		<>
			<Navbar
				user={{ user, dispatch }}
				posts={posts}
				setSearchResult={setSearchResult}
			/>
			{!user && <Header />}
			{search ? (
				<div className="text-gray-100 text-xl font-bold mt-2 w-[69%] text-center">
					<h1>Posts by {search.split('=')[1]}</h1>
				</div>
			) : null}
			<div className="flex">
				<Posts posts={posts} searchResult={searchResult} />
				<Sidebar posts={posts} />
			</div>
		</>
	);
};

export default Home;
