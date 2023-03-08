import React, { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import axios from 'axios';

const PostDetails = () => {
	const [post, setPost] = useState({});

	const idPath = useLocation();
	const id = idPath.pathname.split('/')[2];
	useEffect(() => {
		const getPost = async () => {
			const response = await axios.get(`http://localhost:8000/posts/${id}`);
			console.log(response.data);
			setPost(response.data);
		};
		getPost();
	}, []);

	return (
		<div className="flex-9 mt-1">
			<div className=" p-2.5 pr-0">
				{post.photo && (
					<img
						className=" w-full h-80 object-cover rounded-md"
						src={post.photo}
						alt=""
					/>
				)}
				<div className="flex">
					<h1 className="flex-2 text-3xl text-center font-body">
						{post.title}
					</h1>
					<div className="flex-1 text-2xl">
						<i className="fa-solid fa-file-pen ml-2 cursor-pointer text-emerald-600  "></i>
						<i className="fa-solid fa-trash ml-2 cursor-pointer text-red-600 "></i>
					</div>
				</div>
				<div className="flex justify-between mb-4 text-red-500 font-body">
					<span>
						Author:
						<Link to={`/?user=${post.username}`}>
							<strong>{post.username}</strong>
						</Link>
					</span>
					<span>
						Posted on:{' '}
						{new Date(post.createdAt).toLocaleDateString('en-US', {
							year: 'numeric',
							month: 'long',
							day: 'numeric',
						})}
					</span>
				</div>
				<p className="text-stone-800 text-lg leading-8">{post.description}</p>
			</div>
		</div>
	);
};

export default PostDetails;
