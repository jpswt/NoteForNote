import React from 'react';
import { Link } from 'react-router-dom';

const SingePost = ({ post }) => {
	return (
		<div className="w-[400px] mx-8 mb-3 ">
			{post.photo && (
				<img
					className="w-full h-[275px] object-cover rounded-sm"
					src={post.photo}
					alt=""
				/>
			)}
			<div className="flex flex-col items-center justify-center">
				<div className=" ">
					{post.categories.map((category, i) => (
						<span
							key={i}
							className="font-body text-red-600 font-medium text-small mt-2 mr-2 cursor-pointer"
						>
							{category}
						</span>
					))}
				</div>
				<Link to={`/posts/${post._id}`}>
					<span className="text-xl font-semibold mt-1">{post.title}</span>
				</Link>
				<hr />
				<span className="font-body italic text-base text-stone-600">
					Posted on:{' '}
					{new Date(post.createdAt).toLocaleDateString('en-US', {
						year: 'numeric',
						month: 'long',
						day: 'numeric',
					})}
				</span>
			</div>
			<p className="text-stone-800 mt-2 leading-6 line-clamp-4 text-ellipsis">
				{post.description}
			</p>
		</div>
	);
};

export default SingePost;
