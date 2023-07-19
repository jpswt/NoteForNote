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
				setIsSending(true);
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
		<div className="primary text-md mt-4 flex flex-9 flex-col text-gray-100 sm:w-[100%]">
			{postImg && (
				<div className="flex items-center justify-center">
					<img
						className="mb-2 h-[175px] w-[450px] rounded-md object-cover"
						src={URL.createObjectURL(postImg)}
						alt="user posted image for blog"
					/>
				</div>
			)}
			<form onSubmit={handleSubmit}>
				<div className="flex w-full items-center justify-center ">
					<div className="relative flex w-[80%] items-center justify-between lg:flex-wrap sm:w-[90%]">
						<div className="w-full ">
							<label htmlFor="imgInput">
								<i className="fa-solid fa-folder-plus cursor-pointer p-2 text-xl text-gray-100"></i>
							</label>
							<input
								type="file"
								id="imgInput"
								className="hidden"
								onChange={(e) => setPostImg(e.target.files[0])}
							/>
							<input
								className=" primary mb-2 w-[82%] border-0 border-b-2 border-gray-400 bg-opacity-50 p-2 text-3xl text-gray-100 outline-none md:w-[78%] md:text-2xl sm:w-[82%] sm:rounded-none"
								type="text"
								placeholder="Title"
								autoFocus={true}
								onChange={(e) => setTitle(e.target.value)}
							/>
						</div>
						<button
							className=" accent absolute top-4 right-0 cursor-pointer rounded-md py-1 px-2 text-lg text-white sm:top-5 sm:hidden sm:py-[2px] sm:px-[6px] sm:text-[.95rem] "
							type="submit"
						>
							Publish
						</button>
					</div>
				</div>
				<div className=" flex items-center justify-center ">
					<ReactQuill
						className="ql-snow  ql-editor ql-container mt-2 w-[80%] border-none bg-white p-0 text-gray-600 sm:w-[90%]"
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
					<div className="lg: mb-8 flex w-full flex-wrap items-center justify-center gap-6 lg:w-[90%] lg:px-4">
						{categories.map((cat, i) => (
							<li key={i} className=" list-none ">
								<input
									className=" accent mr-2 h-[18px] w-[18px] accent-[#339999]"
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
						className=" sm:accent hidden px-2 sm:mb-20 sm:block sm:w-[100px] sm:cursor-pointer sm:rounded-md sm:py-1 sm:text-lg sm:text-white"
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
