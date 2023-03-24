import { useContext, useState, useEffect } from 'react';
import axios from 'axios';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { Context } from '../context/Context';

const ComposePost = ({ categories }) => {
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
	const { user } = useContext(Context);
	const [title, setTitle] = useState('');
	const [description, setDescription] = useState('');
	const [postImg, setPostImg] = useState(null);
	const [checked, setChecked] = useState([]);

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
			profilePic: user.profilePic,
			about: user.about,
		};

		// if (profilePic) {
		// 	const data = new FormData();
		// 	const imgName = `${user.username}.jpeg`;
		// 	data.append('name', imgName);
		// 	data.append('file', img);
		// 	newPost.profilePic = imgName;
		// 	try {
		// 		await axios.post('http://localhost:8000/upload', data);
		// 	} catch (err) {
		// 		console.error(err);
		// 	}
		// }

		if (postImg) {
			const postData = new FormData();
			const postImgName = Date.now() + postImg.name;
			postData.append('name', postImgName);
			postData.append('file', postImg);
			newPost.photo = postImgName;
			try {
				await axios.post('http://localhost:8000/upload', postData);
			} catch (err) {}
		}
		try {
			const res = await axios.post('http://localhost:8000/posts', newPost);
			window.location.replace('/posts/' + res.data._id);
			console.log(newPost);
		} catch (err) {}
	};

	// useEffect(() => {
	// 	const fetchCategories = async () => {
	// 		const response = await axios.get('http://localhost:8000/categories');
	// 		setCategories(response.data);
	// 	};
	// 	fetchCategories();
	// }, [categories]);

	return (
		<div className="flex-9 flex flex-col mt-4 primary text-gray-100 text-md">
			{postImg && (
				<div className="flex items-center justify-center">
					<img
						className="w-[450px] h-[175px] object-cover rounded-md mb-2"
						src={URL.createObjectURL(postImg)}
						alt=""
					/>
				</div>
			)}
			<form onSubmit={handleSubmit}>
				<div className="flex items-center justify-center w-full ">
					<div className="flex items-center justify-between w-[80%]">
						<div className="w-full">
							<label htmlFor="imgInput">
								<i className="fa-solid fa-folder-plus text-xl cursor-pointer text-gray-100 p-2"></i>
							</label>
							<input
								type="file"
								id="imgInput"
								className="hidden"
								onChange={(e) => setPostImg(e.target.files[0])}
							/>
							<input
								className=" primary border-b-2 border-gray-400 w-[90%] outline-none p-2 text-3xl mb-2 text-gray-100 bg-opacity-50"
								type="text"
								placeholder="Title"
								autoFocus={true}
								onChange={(e) => setTitle(e.target.value)}
							/>
						</div>
						<button
							className=" accent py-1 px-2 text-white text-lg rounded-md cursor-pointer"
							type="submit"
						>
							Publish
						</button>
					</div>
				</div>
				<div className=" flex items-center justify-center ">
					<ReactQuill
						// className="border-none ml-[36px] mt-4 mb-4 w-[80%] text-gray-600 p-0 ql-container ql-editor "
						className="border-none  mt-2 w-[80%] text-gray-600 bg-white p-0 ql-snow ql-editor ql-container"
						placeholder="Enter your thoughts..."
						theme="snow"
						value={description}
						onChange={setDescription}
						modules={modules}
					/>
				</div>
				<div className="flex flex-col items-center justify-center">
					<h3 className="my-4 text-2xl">Select Categories: </h3>
					<div className="w-full items-center justify-center flex flex-wrap gap-6">
						{categories.map((cat, i) => (
							<li key={i} className=" list-none ">
								<input
									className=" accent-[#339999] mr-2 accent w-[18px] h-[18px]"
									onChange={handleToggle(cat.name)}
									type="checkbox"
								/>
								<label className="form-check-label text-[1.2rem]">
									{cat.name}
								</label>
							</li>
						))}
					</div>
				</div>
				{/* <div className="flex items-center justify-center mt-12">
					<button
						className=" bg-teal-600 py-2 px-10 text-white text-lg rounded-md cursor-pointer"
						type="submit"
					>
						Publish
					</button>
				</div> */}
			</form>
		</div>
	);
};

export default ComposePost;
