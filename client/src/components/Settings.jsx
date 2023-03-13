import React, { useContext, useState } from 'react';
import { Context } from '../context/Context';
import axios from 'axios';

const Settings = () => {
	const { user } = useContext(Context);
	const [img, setImg] = useState(null);
	const [username, setUsername] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [successMsg, setSuccessMsg] = useState(false);

	const handleUpdate = async (e) => {
		e.preventDefault();
		const updateUser = {
			userId: user._id,
			username: username,
			email: email,
			password: password,
		};
		if (img) {
			const data = new FormData();
			const imgName = Date.now() + img.name;
			data.append('name', imgName);
			data.append('file', img);
			updateUser.profilePic = imgName;
			try {
				await axios.post('http://localhost:8000/upload', data);
			} catch (err) {}
		}
		try {
			await axios.put(`http://localhost:8000/users/${user._id}`, updateUser);
			setSuccessMsg(true);
			console.log(updateUser);
		} catch (err) {}
	};

	return (
		<div className="flex-9 mt-1">
			<div className="flex items-center justify-between mb-6 px-8">
				<span className="text-3xl mb-4 text-emerald-600 ">Update Profile</span>
				<span className="text-sm bg-red-600 text-white px-2 py-1 rounded-sm">
					Delete Account
				</span>
			</div>
			<form
				className="flex flex-col justify-center items-center relative"
				onSubmit={handleUpdate}
			>
				<p className="absolute top-[-24px] left-[45%]">Profile Pic</p>
				<div className="flex items-center justify-center mb-6">
					<img
						className="w-40 h-40 object-cover rounded-full "
						src={user.profilePic}
						alt=""
					/>
					<label htmlFor="imgInput">
						<i className="fa-solid fa-user cursor-pointer text-3xl ml-4 text-red-500 "></i>
					</label>
					<input
						type="file"
						id="imgInput"
						className="hidden"
						onChange={(e) => setImg(e.target.files[0])}
					/>
				</div>
				<input
					type="text"
					placeholder={user.username}
					className="p-4 my-2 w-[40%]"
					onChange={(e) => setUsername(e.target.value)}
				/>
				<input
					type="text"
					placeholder={user.email}
					className="p-4 my-2 w-[40%]"
					onChange={(e) => setEmail(e.target.value)}
				/>
				<input
					type="text"
					placeholder="*************"
					className="p-4 my-2 w-[40%]"
					onChange={(e) => setPassword(e.target.value)}
				/>
				<button
					type="submit"
					className="w-40 bg-emerald-500 text-white py-2 rounded-md mt-2 cursor-pointer"
				>
					Update Profile
				</button>
				{successMsg && 'Profile has successfully been updated'}
			</form>
		</div>
	);
};

export default Settings;
