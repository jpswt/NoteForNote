import React, { useContext } from 'react';
import DOMpurify from 'dompurify';
import { Link, useInRouterContext } from 'react-router-dom';
import { Context } from '../context/Context';

const SingePost = ({ post }) => {
	const { user } = useContext(Context);

	const publicFolder = 'http://localhost:8000/assets/';

	const sanitizeData = () => ({
		__html: DOMpurify.sanitize(post.description),
	});

	return (
		<div className="w-[70%] mx-10 mb-4 flex items-center border-b-2 border-gray-300  py-4">
			<div className="flex flex-col w-full ">
				<Link to={`/posts/${post._id}`}>
					<span className=" text-2xl text-stone-900 font-semibold hover:text-red-700 ">
						{post.title}
					</span>
				</Link>
				<div className="flex items-center mt-2 mb-2">
					{/* {post.username === user?.username ? (
						<>
							<span>
								<img
									className="w-[30px] h-[30px] object-cover rounded-full"
									src={user?.profilePic || null}
									alt=""
								/>
							</span>
						</>
					) :(


					)} */}
					<span className="mr-2  text-stone-600">
						{post?.username.charAt(0).toUpperCase()}
						{post?.username.slice(1)} •
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
					className=" leading-6 line-clamp-3 text-ellipsis text-current text-lg mb-4"
					dangerouslySetInnerHTML={sanitizeData()}
				/>
				<div className="my-2 ">
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
			{/* {post.description} */}
			<div>
				{post.photo && (
					<img
						className="w-[100px] h-[100px] object-cover rounded-sm p-0 mx-6"
						src={publicFolder + post.photo}
						alt=""
					/>
				)}
			</div>
			{/* <hr className="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700 z-20" /> */}
		</div>
	);
};

export default SingePost;
