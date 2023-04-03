import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import DOMpurify from 'dompurify';
import { storage } from '../firebase/firebase';
import { getStorage, ref, getDownloadURL } from 'firebase/storage';
import defaultPic from '../assets/default.jpeg';
import defaultPostPic from '../assets/guitar_default.jpeg';

const SinglePost = ({ post }) => {
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
	});

	const sanitizeData = () => ({
		__html: DOMpurify.sanitize(post.description),
	});

	const setDefault = (e) => {
		e.target.src = defaultPic;
	};

	const setDefaultPostPic = (e) => {
		e.target.src = defaultPostPic;
	};

	const formatDate = new Date(post.createdAt).toLocaleDateString('en-US', {
		year: 'numeric',
		month: 'long',
		day: 'numeric',
	});

	return (
		<div className="w-[75%] mx-10 flex items-center border-b-2 border-gray-400 text-gray-100 last:border-b-0 lg:last:mb-14 sm:w-[85%] ">
			<div className="flex flex-col w-full my-6">
				<Link to={`/posts/${post._id}`}>
					<span className=" text-3xl font-semibold hover:text-gray-300 sm:text-xl">
						{post.title}
					</span>
				</Link>
				<div className="mb-2 mt-4 flex items-center">
					<span className="mr-4">
						<img
							className="w-[40px] h-[40px] rounded-full object-cover"
							src={postProfileURL}
							alt="user profile pic"
							onError={setDefault}
						/>
					</span>
					<div className="flex flex-col">
						<span className="font-body text-base">
							<Link
								to={`/?user=${post.username}`}
								className="font-semibold hover:text-gray-300"
							>
								{post.username}
							</Link>
						</span>
						<span className="text-[.95rem]">{formatDate}</span>
					</div>
				</div>
				<div
					className=" leading-6 line-clamp-3 text-ellipsis text-current text-lg details sm:clamp"
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
							className="w-[100px] h-[100px] object-cover rounded-sm p-0 mx-6 hover:opacity-90 sm:w-[60px] sm:h-[60px]"
							src={postImgURL}
							alt="user posted image"
							onError={setDefaultPostPic}
						/>
					</Link>
				)}
			</div>
		</div>
	);
};

export default SinglePost;
