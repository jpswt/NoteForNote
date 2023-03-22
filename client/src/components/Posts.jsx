import React from 'react';
import { useLocation } from 'react-router';
import Header from './Header';
import SinglePost from './SinglePost';

const Posts = ({ posts, searchResult }) => {
	const { home } = useLocation();

	const results = searchResult.map((post, i) => (
		<SinglePost post={post} key={i} />
	));

	const content = results?.length ? results : null;

	const categories = results?.length ? (
		results
	) : (
		<div className="text-gray-100">
			<h2>No Posts Available</h2>
		</div>
	);

	return (
		<div className=" flex-9 flex flex-col items-center w-[80%] mt-4">
			{location.pathname === '/' ? content : categories}
		</div>
	);
};

export default Posts;
