import React from 'react';
import { useLocation } from 'react-router';
import SinglePost from './SinglePost';

const Posts = ({ searchResult }) => {
	const { home } = useLocation();
	const root = location.pathname;

	const results = searchResult.map((post, i) => (
		<SinglePost post={post} key={i} />
	));

	const content = results?.length ? (
		results
	) : (
		<div className="text-gray-100">
			<h2>No Posts Available</h2>
		</div>
	);

	return (
		<div className=" flex-9 flex flex-col items-center w-[80%] mt-4">
			{content}
		</div>
	);
};

export default Posts;
