import React, { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import defaultPic from '../assets/defaultAvatar.svg';
import { Context } from '../context/Context';
import { storage } from '../firebase/firebase';
import { getStorage, ref, getDownloadURL } from 'firebase/storage';

const Sidebar = ({ post, categories }) => {
	const { user } = useContext(Context);
	const publicFolder = `${import.meta.env.VITE_NFN_URI}/assets/`;
	const [profileURL, setProfileURL] = useState(null);
	const [postProfileURL, setPostProfileURL] = useState(null);
	const defaultImg = new URL(defaultPic, import.meta.url).href;

	useEffect(() => {
		if (user) {
			const getProfile = async () => {
				const storage = getStorage();
				let imageRef = ref(storage, user?.profilePic);
				await getDownloadURL(imageRef).then((res) => {
					setProfileURL(res);
				});
			};
			getProfile();
		}
		const getPostProfile = async () => {
			if (post) {
				const storage = getStorage();
				let imageRef = ref(storage, post?.profilePic);
				await getDownloadURL(imageRef).then((res) => {
					setPostProfileURL(res);
				});
			}
		};
		getPostProfile();
	}, []);

	const handleScroll = () => {
		window.scrollTo(0, 0);
	};

	const setDefault = (e) => {
		e.target.src = defaultImg;
	};

	return (
		<div className="min-h-screen flex-4 border-l-2 border-gray-500 font-body text-gray-100 lg:min-h-full lg:border-l-0">
			<div className=" flex w-full flex-col items-center bg-[#2a3d53]">
				<div className="mb-10 flex h-full w-[60%] flex-col items-center pb-2 lg:mb-0 lg:w-full lg:pb-0">
					{!user ? null : !post ? (
						<div className="w-60% flex flex-col items-center lg:hidden">
							<span className="m-2 mt-10 w-full border-b-2 border-solid border-gray-500 p-1 text-center font-title text-lg font-semibold">
								ABOUT ME
							</span>
							<img
								className="mt-6 h-[125px] w-[125px] overflow-hidden rounded-full border-opacity-0 object-cover shadow-lg "
								src={profileURL || defaultImg}
								alt=""
								onError={defaultImg}
							/>

							<Link to={`/?user=${user.username}`}>
								<p className="mt-3 rounded-full bg-[#339999] px-4 text-lg font-semibold hover:bg-opacity-70 hover:text-gray-200">
									{user.username}
								</p>
							</Link>
							{user.about ? (
								<p className="pl-8 pt-2 pb-6 lg:pr-8">{user.about}</p>
							) : (
								<Link to="/profile">
									<button className="accent mt-6 rounded-md px-4 py-2 text-white ">
										Add a Bio
									</button>
								</Link>
							)}
						</div>
					) : (
						<div className="flex w-full flex-col items-center ">
							<span className="m-2 mt-10 w-full border-b-2 border-solid border-gray-500 p-1 text-center font-title text-lg font-semibold lg:mt-0 lg:border-t-2 lg:border-b-0 lg:pt-4">
								POSTED BY
							</span>
							<img
								className="mt-6 h-[125px] w-[125px] rounded-full object-cover "
								src={postProfileURL || defaultImg}
								alt=""
								onError={defaultImg}
							/>
							<Link to={`/?user=${post.username}`}>
								<p className="mt-3 rounded-full bg-[#339999] px-4 text-lg font-semibold hover:bg-opacity-70 hover:text-gray-200">
									{post.username}
								</p>
							</Link>
							<p className="pl-8 pt-4 pb-6 lg:pr-8">{post.about}</p>
						</div>
					)}
				</div>
				<div className="flex w-[60%] flex-col flex-wrap items-center lg:hidden lg:w-[75%]">
					<span className="my-2 mt-0 w-full border-b-2 border-solid border-gray-400 p-1 text-center font-title text-lg font-semibold ">
						DISCOVER YOUR INTERESTS
					</span>

					<ul className=" mb-8 mt-2 flex-2 text-lg lg:ml-4 lg:flex lg:flex-2 lg:flex-wrap lg:justify-start">
						{categories.map((category, i) => (
							<li
								key={category._id}
								className="mt-2 inline-block w-1/2 cursor-pointer px-9 hover:text-gray-400 xl:w-[48%] xl:px-5 "
								onClick={handleScroll}
							>
								<Link to={`/?category=${category.name}`}>{category.name}</Link>
							</li>
						))}
					</ul>
				</div>
				<div className="mt-10 mb-20 flex w-[60%] flex-col lg:mb-4 lg:mt-0 lg:w-full">
					<span className="my-2 mt-0 w-full border-b-2 border-solid border-gray-500 p-1 text-center font-title text-lg font-semibold lg:mb-0 lg:border-t-2 lg:border-b-0 lg:pt-4 sm:pb-2">
						FOLLOW US
					</span>
					<div className="ml-2 mt-4 flex items-center justify-center gap-6 lg:mt-0 lg:gap-8">
						<a target="_blank" href={'https://www.facebook.com/'}>
							<i className="fa-brands fa-facebook text-3xl hover:text-gray-400 "></i>
						</a>
						<a target="_blank" href={'https://www.instagram.com/'}>
							<i className="fa-brands fa-instagram text-3xl hover:text-gray-400 "></i>
						</a>
						<a target="_blank" href={'https://www.twitter.com'}>
							<i className="fa-brands fa-twitter text-3xl hover:text-gray-400 "></i>
						</a>
						<a target="_blank" href={'https://www.youtube.com'}>
							<i className="fa-brands fa-youtube text-3xl hover:text-gray-400 "></i>
						</a>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Sidebar;
