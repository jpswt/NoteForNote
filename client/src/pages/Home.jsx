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
	const [categories, setCategories] = useState([]);
	const [isLoaded, setIsLoaded] = useState(false);

	const { search } = useLocation();

	// console.log(location);

	useEffect(() => {
		const fetchPosts = async () => {
			const response = await axios.get(`http://localhost:8000/posts/${search}`);
			setPosts(response.data);
			setSearchResult(response.data);
			setIsLoaded(true);
		};
		fetchPosts();
	}, [search]);

	useEffect(() => {
		const fetchCategories = async () => {
			const response = await axios.get('http://localhost:8000/categories');
			setCategories(response.data);
		};
		fetchCategories();
	}, []);

	if (!isLoaded) {
		<></>;
	} else
		return (
			<>
				<Navbar
					user={{ user, dispatch }}
					posts={posts}
					setSearchResult={setSearchResult}
				/>
				{user ? null : <Header />}
				<div className="flex lg:flex-col">
					<Posts
						posts={posts}
						searchResult={searchResult}
						categories={categories}
					/>
					<Sidebar posts={posts} categories={categories} />
				</div>
			</>
		);
};

export default Home;
