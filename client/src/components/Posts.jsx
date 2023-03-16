import React from 'react';
import SinglePost from './SinglePost';

const Posts = ({ posts, searchResult }) => {
	const results = searchResult.map((post, i) => (
		<SinglePost post={post} key={i} />
	));

	const content = results?.length ? (
		results
	) : (
		<div>
			<h2>No Posts Available</h2>
		</div>
	);

	return (
		<div className=" flex-9 flex flex-col items-center w-[80%] mt-4">
			{/* {posts.map((post, i) => (
				<SinglePost post={post} key={i} />
			))} */}
			{content}
		</div>
	);
};

export default Posts;
