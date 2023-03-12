import React from 'react';
import SinglePost from './SinglePost';

const Posts = ({ posts }) => {
	return (
		<div className=" flex-9 flex flex-col justify-center items-center w-[80%] mt-4">
			{posts.map((post, i) => (
				<SinglePost post={post} key={post._id} />
			))}
		</div>
	);
};

export default Posts;
