import React from 'react';
import DOMpurify from 'dompurify';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import defaultPic from '../assets/default.jpeg';

const SinglePost = ({ post }) => {
	const navigate = useNavigate();
	const publicFolder = 'http://localhost:8000/assets/';
	// console.log(post);

	const sanitizeData = () => ({
		__html: DOMpurify.sanitize(post.description),
	});

	const setDefault = (e) => {
		e.target.src = defaultPic;
	};

	return (
		<div className="w-[70%] mx-10 flex items-center border-b-2 border-gray-400 text-gray-100 last:border-b-0 ">
			<div className="flex flex-col w-full my-6">
				<Link to={`/posts/${post._id}`}>
					<span className=" text-3xl font-semibold ">{post.title}</span>
				</Link>
				<div className="mb-2 mt-4 flex items-center">
					<span className="mr-4">
						<img
							className="w-[40px] h-[40px] rounded-full object-cover"
							src={publicFolder + post.profilePic}
							alt=""
							onError={setDefault}
						/>
					</span>
					<span className="font-body text-base">
						{post.username} •{' '}
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
							className="font-body text-white accent py-[3px] px-[8px] rounded-xl font-medium text-small mr-2 cursor-pointer"
						>
							{/* {category} */}
							<Link to={`/?category=${category}`}>{category}</Link>
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

export default SinglePost;
