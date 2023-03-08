import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const Register = () => {
	const navigate = useNavigate();
	const [username, setUsername] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState(false);

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
		// response.data;
	};

	return (
		<div className="flex flex-col justify-center items-center h-[100vh] bg-login bg-cover relative ">
			<form
				className="flex flex-col w-[20%] items-center"
				onSubmit={handleSubmit}
			>
				<input
					type="text"
					placeholder="Username "
					className="py-2 px-4 mb-4 w-full outline-red-500 "
					onChange={(e) => setUsername(e.target.value)}
				/>
				<input
					type="email"
					placeholder="Email"
					className="py-2 px-4 mb-4 w-full outline-red-500 "
					onChange={(e) => setEmail(e.target.value)}
				/>
				<input
					type="password"
					placeholder="Password"
					className="py-2 px-4 mb-4 w-full  outline-red-500"
					onChange={(e) => setPassword(e.target.value)}
				/>
				<button
					className="text-white bg-red-500 w-fit py-1 px-10 rounded-md"
					type="submit"
				>
					Register
				</button>
			</form>
			<div className="absolute top-4 right-2 text-white flex items-center">
				<p>Already a Member?</p>
				<button className="mx-2 bg-emerald-600 px-4 py-1 rounded-lg">
					<Link to="/login">Login</Link>
				</button>
			</div>
			{error ? (
				<p className="text-white mt-2 bg-red-500 px-1 py-1">
					Username/Email already exists. Please try again or sign in.
				</p>
			) : null}
		</div>
	);
};

export default Register;
