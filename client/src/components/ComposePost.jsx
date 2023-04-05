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
	const { user } = useContext(Context);
	const [title, setTitle] = useState('');
	const [description, setDescription] = useState('');
	const [postImg, setPostImg] = useState(null);
	const [checked, setChecked] = useState([]);
	const [isSending, setIsSending] = useState(false);

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

		if (postImg) {
			const postData = new FormData();
			const postImgName = Date.now() + postImg.name;
			postData.append('name', postImgName);
			postData.append('file', postImg);
			newPost.photo = postImgName;
			try {
				await axios.post(`${import.meta.env.VITE_NFN_URI}/upload`, postData);
			} catch (err) {}
		}
		try {
			setIsSending(true);
			const res = await axios.post(
				`${import.meta.env.VITE_NFN_URI}/posts`,
				newPost
			);
			window.location.replace('/posts/' + res.data._id);
			// console.log(newPost);
		} catch (err) {}
		setIsSending(false);
	};

	return (
		<div className="flex-9 flex flex-col mt-4 primary text-gray-100 text-md sm:w-[100%]">
			{postImg && (
				<div className="flex items-center justify-center">
					<img
						className="w-[450px] h-[175px] object-cover rounded-md mb-2"
						src={URL.createObjectURL(postImg)}
						alt="user posted image for blog"
					/>
				</div>
			)}
			<form onSubmit={handleSubmit}>
				<div className="flex items-center justify-center w-full ">
					<div className="flex items-center justify-between w-[80%] relative lg:flex-wrap sm:w-[90%]">
						<div className="w-full ">
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
								className=" primary border-0 border-b-2 border-gray-400 w-[82%] outline-none p-2 text-3xl mb-2 text-gray-100 bg-opacity-50 md:w-[78%] md:text-2xl sm:w-[82%] sm:rounded-none"
								type="text"
								placeholder="Title"
								autoFocus={true}
								onChange={(e) => setTitle(e.target.value)}
							/>
						</div>
						<button
							className=" accent py-1 px-2 text-white text-lg rounded-md cursor-pointer absolute top-4 right-0 sm:hidden sm:py-[2px] sm:px-[6px] sm:text-[.95rem] sm:top-5 "
							type="submit"
						>
							Publish
						</button>
					</div>
				</div>
				<div className=" flex items-center justify-center ">
					<ReactQuill
						className="border-none  mt-2 w-[80%] text-gray-600 bg-white p-0 ql-snow ql-editor ql-container sm:w-[90%]"
						modules={modules}
						formats={formats}
						placeholder="Enter your thoughts..."
						theme="snow"
						value={description}
						onChange={setDescription}
					/>
				</div>
				<div className="flex flex-col items-center justify-center">
					<h3 className="my-4 text-2xl">Select Categories: </h3>
					<div className="w-full items-center justify-center flex flex-wrap gap-6 lg:px-4 lg: mb-8 lg:w-[90%]">
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
				<div className="flex flex-col items-center">
					<button
						className=" hidden sm:block sm:accent sm:w-[100px] sm:py-1 px-2 sm:text-white sm:text-lg sm:rounded-md sm:cursor-pointer sm:mb-20"
						type="submit"
					>
						{isSending ? 'Sending...' : 'Publish'}
					</button>
				</div>
			</form>
		</div>
	);
};

export default ComposePost;
