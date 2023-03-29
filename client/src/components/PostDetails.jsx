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

	const formats = [
		'header',
		'font',
		'size',
		'bold',
		'italic',
		'underline',
		'strike',
		'blockquote',
		'list',
		'bullet',
		'indent',
		'link',
		'image',
		'video',
		'code-block',
		'align',
		'direction',
		'color',
		'background',
		'script',
		'super',
		'sub',
	];

	const navigate = useNavigate();
	const { user } = useContext(Context);
	const [openEdit, setOpenEdit] = useState(false);
	const [updateInfo, setUpdateInfo] = useState(false);
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
		if (window.confirm('Are you sure you want to delete this post?')) {
			try {
				await axios.delete(`http://localhost:8000/posts/${post._id}`, {
					data: { username: user.username },
				});
				navigate('/');
			} catch (error) {}
		}
	};

	const handleScroll = () => {
		window.scrollTo(0, 100);
	};

	const sanitizeData = () => ({
		__html: DOMpurify.sanitize(post.description),
	});

	const formatDate = new Date(post.createdAt).toLocaleDateString('en-US', {
		year: 'numeric',
		month: 'long',
		day: 'numeric',
	});

	return (
		<div className="flex-9 flex flex-col items-center mt-1 bg-[#2a3d53] text-gray-100 ">
			<div className=" py-2.5 pr-0 w-[75%]">
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
							<div className="flex gap-4">
								<div>
									{' '}
									<img
										className="w-[45px] h-[45px] rounded-full border-opacity-0  shadow-lg object-cover overflow-hidden "
										src={publicFolder + post?.profilePic}
										alt=""
										// onError={setDefault}
									/>
								</div>
								<div className="flex flex-col items-start">
									<span className="">
										{/* <span>Posted by: </span> */}
										<Link to={`/?user=${post.username}`}>
											<strong>{post.username}</strong>
										</Link>
									</span>
									<span className="text-white text-sm">{formatDate}</span>
								</div>
							</div>
							<span className="flex gap-1 mb-1 ">
								<EmailShareButton>
									<EmailIcon size={30} round />
								</EmailShareButton>
								<FacebookShareButton
									url={'https://www.note4note.com'}
									quote={post.title}
									hashtag="#NoteForNote"
								>
									<FacebookIcon size={30} round />
								</FacebookShareButton>
								<TwitterShareButton
									url={window.location.href}
									quote={post.title}
									hashtag="NoteForNote"
								>
									<TwitterIcon size={30} round />
								</TwitterShareButton>
								<RedditShareButton
									url={window.location.href}
									quote={post.title}
									hashtag="NoteForNote"
									title={post.title}
								>
									<RedditIcon size={30} round />
								</RedditShareButton>
							</span>
						</div>
					</>
				)}
				{updateInfo ? (
					<ReactQuill
						className="border-none mt-2 w-full text-gray-600 bg-white p-0 ql-editor ql-container"
						modules={modules}
						formats={formats}
						theme="snow"
						value={description}
						onChange={setDescription}
					/>
				) : (
					<>
						<div className="flex items-end justify-end">
							{post.username === user?.username && (
								<div>
									{!openEdit ? (
										<div
											className=" text-right text-md font-bold cursor-pointer mb-2 p-1"
											onClick={handleOpenEdit}
										>
											<span className="bg-[#339999] py-1 px-3 rounded-full">
												Edit Post
											</span>
										</div>
									) : (
										<div className="flex-1 text-md font-body mb-2">
											<i
												className="fa-solid fa-file-pen ml-2 cursor-pointer text-white bg-[#339999] p-2 rounded-md bg-opacity-80"
												onClick={() => {
													setUpdateInfo(true);
													handleScroll();
												}}
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
						</div>

						<div
							className="mb-10 blog-link text-lg details lg:text-xl"
							dangerouslySetInnerHTML={sanitizeData()}
						/>
					</>
				)}
				{updateInfo ? (
					<div className="flex items-center justify-center mt-4 gap-6">
						<button
							className="accent text-white px-10 py-2 rounded-md cursor-pointer font-semibold"
							onClick={handleUpdate}
						>
							Update
						</button>
						<div class>
							<button
								className="bg-gray-400 text-white px-10 py-2 rounded-md cursor-pointer font-semibold"
								onClick={() => setUpdateInfo(false)}
							>
								Cancel
							</button>
						</div>
					</div>
				) : null}
			</div>
		</div>
	);
};

export default PostDetails;
