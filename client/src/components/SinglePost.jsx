import React from 'react';
import DOMpurify from 'dompurify';
import { Link } from 'react-router-dom';

const SingePost = ({ post }) => {
	const publicFolder = 'http://localhost:8000/assets/';
	// console.log(post);

	const sanitizeData = () => ({
		__html: DOMpurify.sanitize(post.description),
	});

	return (
		<div className="w-[70%] mx-10 flex items-center border-b-2 border-gray-300 ">
			<div className="flex flex-col w-full my-6">
				<Link to={`/posts/${post._id}`}>
					<span className=" text-3xl text-stone-900  font-semibold ">
						{post.title}
					</span>
				</Link>
				<div className="my-2">
					<span className="font-body text-base text-stone-600">
						{post.username} •{' '}
					</span>
					<span className="font-body italic text-base text-stone-600">
						{new Date(post.createdAt).toLocaleDateString('en-US', {
							year: 'numeric',
							month: 'long',
							day: 'numeric',
						})}
					</span>
				</div>
				<div
					className=" leading-6 line-clamp-3 text-ellipsis text-current text-lg"
					dangerouslySetInnerHTML={sanitizeData()}
				/>
				<div className="mt-4 mb-2">
					{post.categories.map((category, i) => (
						<span
							key={i}
							className="font-body text-white bg-red-700 py-[3px] px-[8px] rounded-xl font-medium text-small mr-2 cursor-pointer hover:bg-red-600"
						>
							{category}
						</span>
					))}
				</div>
			</div>
			<div>
				{post.photo && (
					<img
						className="w-[100px] h-[100px] object-cover rounded-sm p-0 mx-6"
						src={publicFolder + post.photo}
						alt=""
					/>
				)}
			</div>
		</div>
	);
};

export default SingePost;
