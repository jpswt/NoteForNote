import React, { useContext, useRef, useState, useEffect } from 'react';
import { Context } from '../context/Context';
import axios from 'axios';
import defaultPic from '../assets/defaultAvatar.svg';
import { storage } from '../firebase/firebase';
import { getStorage, ref, getDownloadURL } from 'firebase/storage';

const Settings = () => {
	const { user, dispatch } = useContext(Context);
	const publicFolder = `${import.meta.env.VITE_NFN_URI}/assets/`;
	const [img, setImg] = useState(null);
	const [profileURL, setProfileURL] = useState(null);
	const [successMsg, setSuccessMsg] = useState(false);
	const aboutRef = useRef();

	useEffect(() => {
		const getProfile = async () => {
			const storage = getStorage();
			let imageRef = ref(storage, user.profilePic);
			await getDownloadURL(imageRef).then((res) => {
				setProfileURL(res);
			});
		};
		getProfile();
	}, [img]);

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

	const setDefault = (e) => {
		e.target.src = defaultPic;
	};

	return (
		<div className="profile flex flex-9 flex-col items-center justify-center font-body">
			<form
				className="relative flex flex-col items-center justify-center"
				onSubmit={handleUpdate}
			>
				<div className="mb-2 flex items-center justify-center">
					<img
						className="h-40 w-40 rounded-full object-cover "
						src={img ? URL.createObjectURL(img) : profileURL}
						alt="user upload profile pic"
						onError={setDefault}
					/>
				</div>
				<label htmlFor="imgInput" className="cursor-pointer">
					<i className="fa-solid fa-camera mb-4 rounded-md bg-gray-500 py-2 px-4 text-white">
						<span className="ml-2 font-body">Select Photo</span>
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
					className="blocktext sm:blockmobile text-lg text-gray-100"
				>
					About You:
				</label>
				<textarea
					type="text"
					name="about"
					placeholder="Tell us about you..."
					ref={aboutRef}
					defaultValue={user.about}
					className="my-2 w-[24rem] p-4 sm:w-[20rem]"
					rows="4"
					max="300"
				/>
				<button
					type="submit"
					className="mt-2 w-40 cursor-pointer rounded-md bg-[#339999] py-2 font-semibold text-white "
				>
					Update Profile
				</button>
				<p className=" mt-2 text-gray-100">
					{successMsg && 'Profile has successfully been updated'}
				</p>
			</form>
		</div>
	);
};

export default Settings;
