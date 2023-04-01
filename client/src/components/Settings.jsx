import React, { useContext, useRef, useState } from 'react';
import { Context } from '../context/Context';
import axios from 'axios';
import defaultPic from '../assets/defaultAvatar.svg';

const Settings = () => {
	const { user, dispatch } = useContext(Context);
	const publicFolder = `${import.meta.env.VITE_NFN_URI}/assets/`;
	const [img, setImg] = useState(null);
	const [successMsg, setSuccessMsg] = useState(false);
	const aboutRef = useRef();

	const handleUpdate = async (e) => {
		e.preventDefault();
		dispatch({ type: 'UPDATE_START' });
		if (img) {
			const data = new FormData();
			const imgName = `${user.username}.jpeg`;
			data.append('name', imgName);
			data.append('file', img);
			user.profilePic = imgName;
			try {
				await axios.post(`${import.meta.env.VITE_NFN_URI}/upload`, data);
			} catch (err) {}
		}
		try {
			const response = await axios.put(
				`${import.meta.env.VITE_NFN_URI}/users/${user._id}`,
				{
					userId: user._id,
					about: aboutRef.current.value,
					profilePic: user.profilePic,
				}
			);
			dispatch({ type: 'UPDATE_SUCCESS', payload: response.data });
			// window.location.reload();
			setSuccessMsg(true);
			setTimeout(() => {
				window.location.reload();
			}, 1500);
			// console.log(updateUser);
		} catch (err) {
			dispatch({ type: 'UPDATE_FAIL' });
		}
	};

	// const handleDelete = async (id) => {
	// 	try {
	// 		const response = await axios.delete(`http://localhost:8000/${user._id}`)
	// 		const data = await response.json()
	// 	}

	// }

	const setDefault = (e) => {
		e.target.src = defaultPic;
	};

	return (
		<div className="flex-9 profile font-body flex flex-col items-center justify-center">
			<form
				className="flex flex-col justify-center items-center relative"
				onSubmit={handleUpdate}
			>
				<div className="flex items-center justify-center mb-2">
					<img
						className="w-40 h-40 object-cover rounded-full "
						src={
							img ? URL.createObjectURL(img) : publicFolder + user.profilePic
						}
						alt="user upload profile pic"
						onError={setDefault}
					/>
				</div>
				<label htmlFor="imgInput" className="cursor-pointer">
					<i className="fa-solid fa-camera text-white bg-gray-500 py-2 px-4 rounded-md mb-4">
						<span className="font-body ml-2">Select Photo</span>
					</i>
				</label>
				<input
					type="file"
					id="imgInput"
					className="hidden"
					onChange={(e) => setImg(e.target.files[0])}
				/>
				<label
					htmlFor=""
					className="blocktext text-gray-100 text-lg sm:blockmobile"
				>
					About You:
				</label>
				<textarea
					type="text"
					name="about"
					placeholder="Tell us about you..."
					ref={aboutRef}
					defaultValue={user.about}
					className="p-4 my-2 w-[24rem] sm:w-[20rem]"
					rows="4"
					max="300"
				/>
				<button
					type="submit"
					className="w-40 bg-[#339999] text-white font-semibold py-2 rounded-md mt-2 cursor-pointer "
				>
					Update Profile
				</button>
				<p className=" text-gray-100 mt-2">
					{successMsg && 'Profile has successfully been updated'}
				</p>
			</form>
		</div>
	);
};

export default Settings;
