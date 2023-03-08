import React from 'react';
import SinglePost from './SinglePost';

const Posts = ({ posts }) => {
	return (
		<div className=" flex-9 flex flex-wrap m-4">
			{posts.map((post, i) => (
				<SinglePost post={post} key={i} />
			))}
		</div>
	);
};

export default Posts;
