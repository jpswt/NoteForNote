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
			.post('http://localhost:8000/auth/register', {
				username,
				email,
				password,
			})
			.then((response) => {
				console.log(response);
				navigate('/login');
			})
			.catch((error) => {
				setError(true);
				console.log(error);
			});
	};

	return (
		<div className="flex flex-col justify-center items-center h-[100vh] bg-primary ">
			<img src={guitarPick} alt="" className="w-20 h-20" />
			<img src={logo} alt="" className="mt-2" />
			<div className="flex flex-col items-center justify-center ">
				<form
					className="flex flex-col w-full items-center relative mt-14"
					onSubmit={handleSubmit}
				>
					<label htmlFor="username" className="">
						<i className="fa-solid fa-user text-xl text-gray-400 absolute top-[.5rem] left-3"></i>
					</label>
					<input
						type="text"
						placeholder="Username"
						className="py-2.5 pl-10 w-[17rem] mb-4 border-b-2  border-gray-500 bg-primary outline-none caret-gray-200 text-gray-200 accent-input"
						onChange={(e) => setUsername(e.target.value)}
					/>
					<label htmlFor="password">
						<i className="fa-solid fa-envelope text-xl text-gray-400 absolute top-[4.4rem] left-[.6rem]"></i>
					</label>
					<input
						type="email"
						placeholder="Email"
						className="py-2.5 pl-10 w-[17rem] mb-4 border-b-2  border-gray-500 bg-primary outline-none caret-gray-200 text-gray-200 accent-input"
						onChange={(e) => setEmail(e.target.value)}
					/>
					<label htmlFor="password">
						<i className="fa-solid fa-lock text-xl text-gray-400 absolute top-[8.2rem] left-[.7rem]"></i>
					</label>
					<input
						type="password"
						placeholder="Password"
						className="py-2.5 pl-10 w-[17rem] border-b-2 border-gray-500 bg-primary outline-none caret-gray-200 text-gray-200 accent-input"
						onChange={(e) => setPassword(e.target.value)}
					/>
					<button
						className="w-fit mt-6 pt-1 px-[5.5rem] text-gray-200 text-lg font-title accent rounded-md  "
						type="submit"
					>
						REGISTER
					</button>
				</form>
				{error ? (
					<p className="text-gray-300 py-1 px-2 rounded-md ">{error}</p>
				) : null}
			</div>
		</div>
	);
};

export default Register;
