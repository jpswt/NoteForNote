import React, { useContext, useState, useEffect } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import DOMpurify from 'dompurify';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Context } from '../context/Context';
import { storage } from '../firebase/firebase';
import { getStorage, ref, getDownloadURL } from 'firebase/storage';
import defaultPostPic from '../assets/guitar_default.jpeg';
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
	const [postImgURL, setPostImgUrl] = useState(null);
	const [postProfileURL, setPostProfileURL] = useState(null);
	const publicFolder = `${import.meta.env.VITE_NFN_URI}/assets/`;

	useEffect(() => {
		const getPostImg = async () => {
			const storage = getStorage();
			let imageRef = ref(storage, post.photo);
			await getDownloadURL(imageRef).then((res) => {
				setPostImgUrl(res);
			});
		};
		getPostImg();
		const getPostProfile = async () => {
			const storage = getStorage();
			let imageRef = ref(storage, post.profilePic);
			await getDownloadURL(imageRef).then((res) => {
				setPostProfileURL(res);
			});
		};
		getPostProfile();
	}, []);

	const handleOpenEdit = () => {
		setOpenEdit(!openEdit);
	};

	const handleUpdate = async () => {
		try {
			await axios.put(`${import.meta.env.VITE_NFN_URI}/posts/${post._id}`, {
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
				await axios.delete(
					`${import.meta.env.VITE_NFN_URI}/posts/${post._id}`,
					{
						data: { username: user.username },
					}
				);
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

	const setDefaultPostPic = (e) => {
		e.target.src = defaultPostPic;
	};

	return (
		<div className="mt-1 flex flex-9 flex-col items-center bg-[#2a3d53] text-gray-100 ">
			<div className=" w-[75%] py-2.5 pr-0 sm:w-[85%]">
				{post.photo && (
					<img
						className=" my-2 mx-auto mb-4 h-[180px] w-[450px] rounded-md object-cover"
						src={postImgURL}
						alt="user upload post photo for blog"
						onError={setDefaultPostPic}
					/>
				)}
				{updateInfo ? (
					<div className="flex">
						<input
							type="text"
							value={title}
							onChange={(e) => setTitle(e.target.value)}
							autoFocus={true}
							className="w-full bg-gray-600 py-2 text-center text-3xl outline-none"
						/>
					</div>
				) : (
					<>
						<h1 className="flex-2 text-center font-body text-3xl">{title}</h1>
						<div className="mt-2 mb-4 flex items-center justify-between border-b-2 border-b-gray-200 pb-1 font-body">
							<div className="flex gap-4">
								<div>
									{' '}
									<img
										className="h-[45px] w-[45px] overflow-hidden rounded-full  border-opacity-0 object-cover shadow-lg "
										src={postProfileURL}
										alt="user upload profile pic"
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
									<span className="text-sm text-white">{formatDate}</span>
								</div>
							</div>
							<span className="mb-1 flex gap-1 ">
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
						className="ql-editor ql-container mt-2 w-full border-none bg-white p-0 text-gray-600"
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
											className=" text-md mb-2 cursor-pointer p-1 text-right font-bold"
											onClick={handleOpenEdit}
										>
											<span className="rounded-full bg-[#339999] py-1 px-3">
												Edit Post
											</span>
										</div>
									) : (
										<div className="flex-1 text-md mb-2 font-body">
											<i
												className="fa-solid fa-file-pen ml-2 cursor-pointer rounded-md bg-[#339999] bg-opacity-80 p-2 text-white"
												onClick={() => {
													setUpdateInfo(true);
													handleScroll();
												}}
											>
												<span className="ml-2 font-body">Update</span>
											</i>
											<i
												className="fa-solid fa-trash ml-2 cursor-pointer rounded-md bg-red-700 bg-opacity-80 p-2 text-white "
												onClick={handleDelete}
											>
												<span className="ml-2 font-body">Delete</span>
											</i>
											<i
												className="fa-solid fa-xmark ml-2 cursor-pointer rounded-md bg-gray-400 py-2 px-3 "
												onClick={() => setOpenEdit(false)}
											></i>
										</div>
									)}
								</div>
							)}
						</div>

						<div
							className="blog-link details mb-10 text-lg lg:text-xl"
							dangerouslySetInnerHTML={sanitizeData()}
						/>
					</>
				)}
				{updateInfo ? (
					<div className="mt-4 flex items-center justify-center gap-6">
						<button
							className="accent cursor-pointer rounded-md px-10 py-2 font-semibold text-white"
							onClick={handleUpdate}
						>
							Update
						</button>
						<div class>
							<button
								className="cursor-pointer rounded-md bg-gray-400 px-10 py-2 font-semibold text-white"
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
