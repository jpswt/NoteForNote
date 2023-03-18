import axios from 'axios';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import React, { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { Context } from '../context/Context';

const ComposePost = () => {
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
	console.log(user);

	const [title, setTitle] = useState('');
	const [description, setDescription] = useState('');
	const [img, setImg] = useState(null);
	const [profilePic, setProfilePic] = useState(
		'http://localhost:8000/assets/default.jpeg'
	);
	const [checked, setChecked] = useState([]);
	const [categories, setCategories] = useState([]);

	useEffect(() => {
		const fetchCategories = async () => {
			const response = await axios.get('http://localhost:8000/categories');
			setCategories(response.data);
		};
		fetchCategories();
	}, []);

	const handleToggle = (cat) => () => {
		const clickedCategory = checked.indexOf(cat);
		const all = [...checked];

		if (clickedCategory === -1) {
			all.push(cat);
		} else {
			all.splice(clickedCategory, 1);
		}
		setChecked(all);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		const newPost = {
			username: user.username,
			title,
			description,
			categories: checked,
			profilePic,
			about: user.about,
		};

		if (profilePic) {
			const profileData = new FormData();
			const profileName = `${user.username}.jpeg`;
			profileData.append('name', profileName);
			profileData.append('file', profilePic);
			newPost.profilePic = profileName;
			try {
				await axios.post('http://localhost:8000/upload', profileData);
			} catch (err) {
				console.error(err);
			}
		}

		if (img) {
			const data = new FormData();
			const imgName = Date.now() + img.name;
			data.append('name', imgName);
			data.append('file', img);
			newPost.photo = imgName;
			try {
				await axios.post('http://localhost:8000/upload', data);
			} catch (err) {}
		}
		try {
			const res = await axios.post('http://localhost:8000/posts', newPost);
			navigate(`/posts/${res.data._id}`);
			console.log(newPost);
		} catch (err) {}
	};

	return (
		<div className="flex-9 flex flex-col mt-4 bg-gray-600 text-gray-100 text-md">
			{img && (
				<div className="flex items-center justify-center">
					<img
						className="w-[82.5%] h-[275px] object-cover rounded-md mb-2"
						src={URL.createObjectURL(img)}
						alt=""
					/>
				</div>
			)}
			<form onSubmit={handleSubmit}>
				<div className="flex items-center justify-center w-full ">
					<label htmlFor="fileInput">
						<i className="fa-solid fa-folder-plus text-xl cursor-pointer text-gray-100 p-2"></i>
					</label>
					<input
						type="file"
						id="fileInput"
						className="hidden"
						onChange={(e) => setImg(e.target.files[0])}
					/>
					<input
						className=" bg-gray-600 border-b-2 border-gray-400 outline-none p-2 w-[80%] text-3xl mb-2"
						type="text"
						placeholder="Title"
						autoFocus={true}
						onChange={(e) => setTitle(e.target.value)}
					/>
				</div>
				<div className=" flex items-center justify-center ">
					<ReactQuill
						// className="border-none ml-[36px] mt-4 mb-4 w-[80%] text-gray-600 p-0 ql-container ql-editor "
						className="border-none ml-[36px] h-[300px] mt-2 w-[80%] text-gray-600 bg-white p-0 ql-editor ql-container"
						placeholder="Enter your thoughts..."
						theme="snow"
						value={description}
						onChange={setDescription}
						modules={modules}
					/>
				</div>
				<div className="flex flex-col items-center justify-center">
					<h3 className="my-4 text-xl">Select Categories: </h3>
					<div className="w-full items-center justify-center flex flex-wrap gap-6">
						{categories.map((cat, i) => (
							<li key={i} className=" list-none ">
								<input
									className="accent-teal-600 mr-2"
									onChange={handleToggle(cat.name)}
									type="checkbox"
								/>
								<label className="form-check-label text-xl">{cat.name}</label>
							</li>
						))}
					</div>
				</div>
				<div className="flex items-center justify-center mt-12">
					<button
						className=" bg-teal-600 py-2 px-10 text-white text-lg rounded-md cursor-pointer"
						type="submit"
					>
						Publish
					</button>
				</div>
			</form>
		</div>
	);
};

export default ComposePost;
