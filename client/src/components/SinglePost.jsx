import React from 'react';
import { Link } from 'react-router-dom';
import DOMpurify from 'dompurify';
import defaultPic from '../assets/default.jpeg';

const SinglePost = ({ post }) => {
	const publicFolder = `${import.meta.env.VITE_NFN_URI}/assets/`;

	const sanitizeData = () => ({
		__html: DOMpurify.sanitize(post.description),
	});

	const setDefault = (e) => {
		e.target.src = defaultPic;
	};

	const formatDate = new Date(post.createdAt).toLocaleDateString('en-US', {
		year: 'numeric',
		month: 'long',
		day: 'numeric',
	});

	return (
		<div className="w-[75%] mx-10 flex items-center border-b-2 border-gray-400 text-gray-100 last:border-b-0 lg:last:mb-14 ">
			<div className="flex flex-col w-full my-6">
				<Link to={`/posts/${post._id}`}>
					<span className=" text-3xl font-semibold hover:text-gray-300 ">
						{post.title}
					</span>
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
						<Link
							to={`/?user=${post.username}`}
							className="font-semibold hover:text-gray-300"
						>
							{post.username}
						</Link>{' '}
						• {formatDate}
					</span>
				</div>
				<div
					className=" leading-6 line-clamp-3 text-ellipsis text-current text-lg details"
					dangerouslySetInnerHTML={sanitizeData()}
				/>
				<div className="mt-4 mb-2">
					{post.categories.map((category, i) => (
						<span
							key={i}
							className="font-body text-white bg-[#339999] py-[3px] px-[8px] rounded-xl font-medium text-small mr-2 cursor-pointer hover:bg-opacity-70 hover:text-gray-200"
						>
							<Link to={`/?category=${category}`}>{category}</Link>
						</span>
					))}
				</div>
			</div>
			<div>
				{post.photo && (
					<Link to={`/posts/${post._id}`}>
						<img
							className="w-[100px] h-[100px] object-cover rounded-sm p-0 mx-6 hover:opacity-90"
							src={publicFolder + post.photo}
							alt=""
						/>
					</Link>
				)}
			</div>
		</div>
	);
};

export default SinglePost;
