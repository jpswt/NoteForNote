import React, { useContext, useEffect, useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import DOMpurify from 'dompurify';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Context } from '../context/Context';

const PostDetails = () => {
	const modules = {
		toolbar: [
			[
				{ header: [1, 2, 3, false] },
				'bold',
				'italic',
				'underline',
				'strike',
				'link',
				{ list: 'ordered' },
				{ list: 'bullet' },
				{ color: [] },
				{ script: 'sub' },
				{ script: 'super' },
				{ indent: '-1' },
				{ indent: '+1' },
			],
		],
	};

	const navigate = useNavigate();
	const { user } = useContext(Context);
	const [post, setPost] = useState({});
	const [title, setTitle] = useState('');
	const [description, setDescription] = useState('');
	const [updateInfo, setUpdateInfo] = useState(false);
	const idPath = useLocation();
	const id = idPath.pathname.split('/')[2];
	const publicFolder = 'http://localhost:8000/assets/';

	useEffect(() => {
		const getPost = async () => {
			const response = await axios.get(`http://localhost:8000/posts/${id}`);
			console.log(response.data);
			setPost(response.data);
			setTitle(response.data.title);
			setDescription(response.data.description);
		};
		getPost();
	}, []);

	const handleUpdate = async () => {
		try {
			await axios.put(`http://localhost:8000/posts/${post._id}`, {
				username: user.username,
				title: title,
				description: description,
			});
			// setUpdateInfo(false);
			window.location.reload();
		} catch (error) {}
	};

	const handleDelete = async () => {
		try {
			await axios.delete(`http://localhost:8000/posts/${post._id}`, {
				data: { username: user.username },
			});
			navigate('/dashboard');
		} catch (error) {}
	};

	const sanitizeData = () => ({
		__html: DOMpurify.sanitize(post.description),
	});

	return (
		<div className="flex-9 flex flex-col justify-center items-center mt-1">
			<div className=" p-2.5 pr-0 w-[80%]">
				{post.photo && (
					<img
						className=" w-full h-80 object-cover rounded-md"
						src={publicFolder + post.photo}
						alt=""
					/>
				)}
				{updateInfo ? (
					<div className="flex">
						<input
							type="text"
							value={title}
							onChange={(e) => setTitle(e.target.value)}
							autoFocus={true}
							className="w-full py-2 text-center text-3xl text-stone-500 outline-teal-600"
						/>
					</div>
				) : (
					<div className="flex">
						<h1 className="flex-2 text-3xl text-center font-body">{title}</h1>

						{post.username === user?.username && (
							<div className="flex-1 text-xl">
								<i
									className="fa-solid fa-file-pen ml-2 cursor-pointer text-white bg-teal-600 p-3 rounded-full "
									onClick={() => setUpdateInfo(true)}
								></i>
								<i
									className="fa-solid fa-trash ml-2 cursor-pointer text-white bg-red-700  p-3 rounded-full "
									onClick={handleDelete}
								></i>
							</div>
						)}
					</div>
				)}
				<div className="flex justify-between mt-2 mb-4 text-red-700 font-body border-b-stone-400 border-b-2">
					<span>
						<span>Posted by: </span>
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
				{updateInfo ? (
					<ReactQuill
						className="outline-red-700 border-none mt-2 w-full text-stone-500 bg-white p-0 ql-editor ql-container"
						theme="snow"
						value={description}
						onChange={setDescription}
						modules={modules}
					/>
				) : (
					<div
						className="mb-10 text-inherit blog-link"
						dangerouslySetInnerHTML={sanitizeData()}
					/>
				)}
				{updateInfo ? (
					<div className="flex items-center justify-center mt-4">
						<button
							className="bg-teal-600 text-white px-20 py-2 rounded-md cursor-pointer"
							onClick={handleUpdate}
						>
							Update
						</button>
					</div>
				) : null}
			</div>
		</div>
	);
};

export default PostDetails;
