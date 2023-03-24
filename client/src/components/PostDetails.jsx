import React, { useContext, useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import DOMpurify from 'dompurify';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Context } from '../context/Context';
import { useLocation } from 'react-router';
import {
	EmailShareButton,
	EmailIcon,
	FacebookIcon,
	FacebookShareButton,
	TwitterShareButton,
	TwitterIcon,
	RedditShareButton,
	RedditIcon,
} from 'react-share';

const PostDetails = ({
	post,
	title,
	description,
	profilePic,
	setDescription,
	setTitle,
}) => {
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
	const [openEdit, setOpenEdit] = useState(false);
	const [updateInfo, setUpdateInfo] = useState(false);
	const idPath = useLocation();
	console.log(idPath);
	const id = idPath.pathname.split('/')[2];
	const publicFolder = 'http://localhost:8000/assets/';

	const handleOpenEdit = () => {
		setOpenEdit(!openEdit);
	};

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
			navigate('/');
		} catch (error) {}
	};

	const sanitizeData = () => ({
		__html: DOMpurify.sanitize(post.description),
	});

	return (
		<div className="flex-9 flex flex-col items-center mt-1 bg-[#2a3d53] text-gray-100 ">
			<div className=" py-2.5 pr-0 w-[80%]">
				{post.photo && (
					<img
						className=" w-[450px] h-[180px] object-cover rounded-md my-2 mx-auto mb-4"
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
							className="w-full py-2 text-center text-3xl bg-gray-600 outline-none"
						/>
					</div>
				) : (
					<>
						<h1 className="flex-2 text-3xl text-center font-body">{title}</h1>
						<div className="flex justify-between items-center mt-2 mb-4 pb-1 font-body border-b-gray-200 border-b-2">
							<div>
								<span className="mr-6">
									<span>Posted by: </span>
									<Link to={`/?user=${post.username}`}>
										<strong>{post.username}</strong>
									</Link>
								</span>
								<span className="text-white">
									{new Date(post.createdAt).toLocaleDateString('en-US', {
										year: 'numeric',
										month: 'long',
										day: 'numeric',
									})}
								</span>
							</div>
							<span className="flex gap-1 mb-1 ">
								<EmailShareButton>
									<EmailIcon size={32} round />
								</EmailShareButton>
								<FacebookShareButton
									url={'https://www.note4note.com'}
									quote={post.title}
									hashtag="#NoteForNote"
								>
									<FacebookIcon size={32} round />
								</FacebookShareButton>
								<TwitterShareButton
									url={window.location.href}
									quote={post.title}
									hashtag="NoteForNote"
								>
									<TwitterIcon size={32} round />
								</TwitterShareButton>
								<RedditShareButton
									url={window.location.href}
									quote={post.title}
									hashtag="NoteForNote"
									title={post.title}
								>
									<RedditIcon size={32} round />
								</RedditShareButton>
							</span>
						</div>
					</>
				)}
				{/* <div className="flex justify-between items-center mt-2 mb-4 pb-1 font-body border-b-gray-200 border-b-2">
					<span>
						<span>Posted by: </span>
						<Link to={`/?user=${post.username}`}>
							<strong>{post.username}</strong>
						</Link>
					</span>
					<span className="text-white">
						{new Date(post.createdAt).toLocaleDateString('en-US', {
							year: 'numeric',
							month: 'long',
							day: 'numeric',
						})}
					</span>
					<span className="flex gap-1 mb-1 ">
						<EmailShareButton>
							<EmailIcon size={32} round />
						</EmailShareButton>
						<FacebookShareButton
							url={'https://www.note4note.com'}
							quote={post.title}
							hashtag="#NoteForNote"
						>
							<FacebookIcon size={32} round />
						</FacebookShareButton>
						<TwitterShareButton
							url={window.location.href}
							quote={post.title}
							hashtag="NoteForNote"
						>
							<TwitterIcon size={32} round />
						</TwitterShareButton>
						<RedditShareButton
							url={window.location.href}
							quote={post.title}
							hashtag="NoteForNote"
							title={post.title}
						>
							<RedditIcon size={32} round />
						</RedditShareButton>
					</span>
				</div> */}
				{updateInfo ? (
					<ReactQuill
						className="border-none mt-2 w-full text-gray-600 bg-white p-0 ql-editor ql-container"
						theme="snow"
						value={description}
						onChange={setDescription}
						modules={modules}
					/>
				) : (
					<>
						{!openEdit ? (
							<div
								className=" text-right text-md font-bold cursor-pointer"
								onClick={handleOpenEdit}
							>
								<span className="bg-[#339999] py-1 px-3 rounded-full">
									Edit Post
								</span>
							</div>
						) : (
							// <i
							// 	className="fa-solid fa-rectangle-xmark cursor-pointer"
							// 	onClick={handleOpenEdit}
							// ></i>
							<div className="flex items-end justify-end">
								{post.username === user?.username && (
									<div className="flex-1 text-md font-body">
										<i
											className="fa-solid fa-file-pen ml-2 cursor-pointer text-white bg-[#339999] p-2 rounded-md bg-opacity-80"
											onClick={() => setUpdateInfo(true)}
										>
											<span className="font-body ml-2">Update</span>
										</i>
										<i
											className="fa-solid fa-trash ml-2 cursor-pointer text-white bg-red-700 p-2 rounded-md bg-opacity-80 "
											onClick={handleDelete}
										>
											<span className="font-body ml-2">Delete</span>
										</i>
										<i
											className="fa-solid fa-xmark cursor-pointer ml-2 bg-gray-400 py-2 px-3 rounded-md "
											onClick={() => setOpenEdit(false)}
										></i>
									</div>
								)}
							</div>
						)}
						<div
							className="mb-10 text-inherit blog-link text-xl"
							dangerouslySetInnerHTML={sanitizeData()}
						/>
					</>
				)}
				{updateInfo ? (
					<div className="flex items-center justify-center mt-4">
						<button
							className="accent text-white px-20 py-2 rounded-md cursor-pointer"
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
