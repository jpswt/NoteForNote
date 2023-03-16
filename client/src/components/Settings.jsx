import React, { useContext, useState } from 'react';
import { Context } from '../context/Context';
import axios from 'axios';
import defaultPic from '../assets/default.jpeg';

const Settings = () => {
	const { user, dispatch } = useContext(Context);
	const publicFolder = 'http://localhost:8000/assets/';
	const [img, setImg] = useState(null);
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [about, setAbout] = useState('');
	const [successMsg, setSuccessMsg] = useState(false);
	console.log(user);

	const handleUpdate = async (e) => {
		e.preventDefault();
		dispatch({ type: 'UPDATE_START' });
		const updateUser = {
			userId: user._id,
			email: email,
			password: password,
			about: about,
		};
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
			setSuccessMsg(false);
			console.log(updateUser);
		} catch (err) {
			dispatch({ type: 'UPDATE_FAIL' });
		}
	};

	const setDefault = (e) => {
		e.target.src = defaultPic;
	};

	return (
		<div className="flex-9 mt-1">
			<div className="flex items-center justify-between mb-6 px-8">
				<span className="text-3xl mb-4 text-teal-700 ">Update Profile</span>
				<span className="text-sm bg-red-700 text-white px-2 py-1 rounded-sm">
					Delete Account
				</span>
			</div>
			<form
				className="flex flex-col justify-center items-center relative"
				onSubmit={handleUpdate}
			>
				<div className="flex items-center justify-center mb-6">
					<img
						className="w-40 h-40 object-cover rounded-full "
						src={
							img ? URL.createObjectURL(img) : publicFolder + user.profilePic
						}
						alt=""
						onError={setDefault}
					/>
				</div>
				<label htmlFor="imgInput">
					<i className="fa-solid fa-user cursor-pointer text-3xl ml-4 text-red-700 ">
						{' '}
						Update Photo
					</i>
				</label>
				<input
					type="file"
					id="imgInput"
					className="hidden"
					onChange={(e) => setImg(e.target.files[0])}
				/>
				<input
					type="text"
					placeholder={user.email}
					className="p-4 my-2 w-[40%]"
					onChange={(e) => setEmail(e.target.value)}
				/>
				<input
					type="text"
					placeholder={user.about}
					className="p-4 my-2 w-[40%]"
					onChange={(e) => setAbout(e.target.value)}
					max="300"
				/>
				<input
					type="text"
					placeholder="*************"
					className="p-4 my-2 w-[40%]"
					onChange={(e) => setPassword(e.target.value)}
					required
				/>
				<button
					type="submit"
					className="w-40 bg-teal-700 text-white py-2 rounded-md mt-2 cursor-pointer"
				>
					Update Profile
				</button>
				{successMsg && 'Profile has successfully been updated'}
			</form>
		</div>
	);
};

export default Settings;
