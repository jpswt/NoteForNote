import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router';
import PostDetails from '../components/PostDetails';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import axios from 'axios';

const SinglePostDetails = () => {
	const [post, setPost] = useState({});
	const [title, setTitle] = useState('');
	const [description, setDescription] = useState('');
	const [profilePic, setProfilePic] = useState(null);
	const idPath = useLocation();
	console.log(idPath);
	const id = idPath.pathname.split('/')[2];

	useEffect(() => {
		const getPost = async () => {
			const response = await axios.get(`http://localhost:8000/posts/${id}`);
			console.log(response.data);
			setPost(response.data);
		};
		getPost();
	}, [id]);
	//
	return (
		<div>
			<Navbar />
			<div className="flex">
				<PostDetails
					post={post}
					title={title}
					description={description}
					profilePic={profilePic}
				/>
				<Sidebar post={post} />
			</div>
		</div>
	);
};

export default SinglePostDetails;
