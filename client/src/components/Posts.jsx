import React from 'react';
import SinglePost from './SinglePost';

const Posts = ({ posts }) => {
	return (
		<div className=" flex-9 flex flex-col items-center w-[80%] mt-4">
			{posts.map((post, i) => (
				<SinglePost post={post} key={i} />
			))}
		</div>
	);
};

export default Posts;
