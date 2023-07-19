import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import guitarPick from '../assets/guitar-pick.png';
import logo from '../assets/nfn2.png';

const Register = () => {
	const navigate = useNavigate();
	const [username, setUsername] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState('');

	const handleSubmit = async (e) => {
		e.preventDefault();

		await axios
			.post(`${import.meta.env.VITE_NFN_URI}/auth/register`, {
				username,
				email,
				password,
			})
			.then((response) => {
				// console.log(response);
				navigate('/login');
			})
			.catch((error) => {
				setError(true);
				// console.log(error);
			});
	};

	return (
		<div className="bg-primary flex h-[100vh] flex-col items-center justify-center ">
			<img
				src={guitarPick}
				alt="logo of a teal guitar pick"
				className="h-20 w-20"
			/>
			<img src={logo} alt="logo text for Note for Note" className="mt-2" />
			<div className="flex flex-col items-center justify-center ">
				<form
					className="relative mt-14 flex w-full flex-col items-center"
					onSubmit={handleSubmit}
				>
					<label htmlFor="username" className="">
						<i className="fa-solid fa-user absolute top-[.5rem] left-3 text-xl text-gray-400"></i>
					</label>
					<input
						type="text"
						placeholder="Username"
						className="bg-primary accent-input mb-4 w-[17rem] border-b-2  border-gray-500 py-2.5 pl-10 text-gray-200 caret-gray-200 outline-none"
						onChange={(e) => setUsername(e.target.value)}
					/>
					<label htmlFor="password">
						<i className="fa-solid fa-envelope absolute top-[4.4rem] left-[.6rem] text-xl text-gray-400"></i>
					</label>
					<input
						type="email"
						placeholder="Email"
						className="bg-primary accent-input mb-4 w-[17rem] border-b-2  border-gray-500 py-2.5 pl-10 text-gray-200 caret-gray-200 outline-none"
						onChange={(e) => setEmail(e.target.value)}
					/>
					<label htmlFor="password">
						<i className="fa-solid fa-lock absolute top-[8.2rem] left-[.7rem] text-xl text-gray-400"></i>
					</label>
					<input
						type="password"
						placeholder="Password"
						className="bg-primary accent-input w-[17rem] border-b-2 border-gray-500 py-2.5 pl-10 text-gray-200 caret-gray-200 outline-none"
						onChange={(e) => setPassword(e.target.value)}
					/>
					<button
						className="accent mt-6 w-fit rounded-md px-[5.5rem] pt-1 font-title text-lg text-gray-200  "
						type="submit"
					>
						REGISTER
					</button>
				</form>
				{error ? (
					<p className="rounded-md py-1 px-2 text-gray-300 ">{error}</p>
				) : null}
			</div>
		</div>
	);
};

export default Register;
