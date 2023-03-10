import axios from 'axios';
import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router';
import { Context } from '../context/Context';

const ComposePost = () => {
	const navigate = useNavigate();
	const { user } = useContext(Context);

	const [title, setTitle] = useState('');
	const [description, setDescription] = useState('');
	const [img, setImg] = useState(null);

	const handleSubmit = async (e) => {
		e.preventDefault();
		const newPost = {
			username: user.username,
			title,
			description,
		};
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
		} catch (err) {}
	};

	return (
		<div className="flex-9 flex flex-col mt-4">
			{img && (
				<div className="flex items-center justify-center ml-[36px]">
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
						<i className="fa-solid fa-folder-plus text-xl cursor-pointer text-stone-600 p-2"></i>
					</label>
					<input
						type="file"
						id="fileInput"
						className="hidden"
						onChange={(e) => setImg(e.target.files[0])}
					/>
					<input
						className=" outline-red-500 p-2 w-[80%] text-3xl text-stone-500"
						type="text"
						placeholder="Title"
						autoFocus={true}
						onChange={(e) => setTitle(e.target.value)}
					/>
				</div>
				<div className=" flex items-center justify-center">
					<textarea
						className="outline-red-500 border-none p-2 ml-[36px] mt-2 w-[80%] text-stone-500"
						placeholder="Hit Record..."
						id=""
						cols="30"
						rows="10"
						onChange={(e) => setDescription(e.target.value)}
					></textarea>
				</div>
				<div className="flex items-center justify-center mt-4">
					<button
						className=" bg-red-500  py-2 px-4 text-white rounded-md cursor-pointer"
						type="submit"
					>
						Save Recording
					</button>
				</div>
			</form>
		</div>
	);
};

export default ComposePost;
