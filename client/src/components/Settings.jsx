import React, { useContext, useState } from 'react';
import { Context } from '../context/Context';
import axios from 'axios';
import defaultPic from '../assets/defaultAvatar.svg';
import { Link } from 'react-router-dom';

const Settings = () => {
	const { user, dispatch } = useContext(Context);
	const publicFolder = 'http://localhost:8000/assets/';
	const [img, setImg] = useState(null);
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [about, setAbout] = useState('');
	const [successMsg, setSuccessMsg] = useState(false);
	console.log(user.email);

	const handleUpdate = async (e) => {
		e.preventDefault();
		dispatch({ type: 'UPDATE_START' });
		const updateUser = {
			userId: user._id,
			email: email,
			password: password,
			about: about,
		};
		if (updateUser.email === '') {
			return user.email;
		}
		if (updateUser.about === '') {
			return user.about;
		}
		if (updateUser.password === '') {
			return user.password;
		}
		if (img) {
			const data = new FormData();
			const imgName = `${user.username}.jpeg`;
			data.append('name', imgName);
			data.append('file', img);
			updateUser.profilePic = imgName;
			try {
				await axios.post('http://localhost:8000/upload', data);
			} catch (err) {}
		}
		try {
			const response = await axios.put(
				`http://localhost:8000/users/${user._id}`,
				updateUser
			);
			dispatch({ type: 'UPDATE_SUCCESS', payload: response.data });
			window.location.reload();
			setSuccessMsg(true);
			console.log(updateUser);
		} catch (err) {
			dispatch({ type: 'UPDATE_FAIL' });
		}
	};

	const setDefault = (e) => {
		e.target.src = defaultPic;
	};

	return (
		<div className="flex-9 mt-1 font-body">
			<form
				className="flex flex-col justify-center items-center relative"
				onSubmit={handleUpdate}
			>
				<div className=" text-gray-100 text-lg mb-4">
					Complete any fields you wish to update
				</div>
				<div className="flex items-center justify-center mb-2">
					<img
						className="w-[100px] h-[100px] object-cover rounded-full "
						src={
							img ? URL.createObjectURL(img) : publicFolder + user.profilePic
						}
						alt=""
						onError={setDefault}
					/>
				</div>
				<label htmlFor="imgInput">
					{/* <i className="fa-solid fa-user cursor-pointer text-3xl ml-4 text-red-700 ">
						{' '}
						Update Photo
					</i> */}
					<i className="fa-solid fa-camera text-white bg-gray-500 py-2 px-4 rounded-md mb-4">
						<span className="font-body ml-2">Update Photo</span>
					</i>
				</label>
				<input
					type="file"
					id="imgInput"
					className="hidden"
					onChange={(e) => setImg(e.target.files[0])}
				/>
				<label className=" text-left text-gray-100" htmlFor="about">
					Tell us about you...
				</label>
				<textarea
					type="text"
					id="about"
					placeholder={user.about}
					className="p-4 my-2 w-[24rem]"
					onChange={(e) => setAbout(e.target.value)}
					max="300"
				/>

				<label className=" text-left text-gray-100" htmlFor="email">
					Email
				</label>
				<input
					type="text"
					id="email"
					placeholder={user.email}
					className="px-3 py-2 my-2 w-[24rem]"
					onChange={(e) => setEmail(e.target.value)}
				/>
				<label className=" text-left text-gray-100" htmlFor="email">
					Password
				</label>
				<input
					type="text"
					id="password"
					placeholder="*************"
					className="px-3 py-2 my-2 w-[24rem]"
					onChange={(e) => setPassword(e.target.value)}
				/>

				<button
					type="submit"
					className="w-40 accent text-white py-2 rounded-md mt-2 cursor-pointer"
				>
					Update Profile
				</button>
				{successMsg && 'Profile has successfully been updated'}
			</form>
		</div>
	);
};

export default Settings;
