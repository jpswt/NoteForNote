import React, { useState, useContext, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Context } from '../context/Context';
import axios from 'axios';

const Login = () => {
	const navigate = useNavigate();
	const userRef = useRef();
	const passwordRef = useRef();
	const [error, setError] = useState('');

	const { dispatch, fetched } = useContext(Context);

	const handleSubmit = async (e) => {
		e.preventDefault();
		dispatch({ type: 'LOGIN_START' });

		await axios
			.post('http://localhost:8000/auth/login', {
				username: userRef.current.value,
				password: passwordRef.current.value,
			})
			.then((response) => {
				dispatch({ type: 'LOGIN_SUCCESS', payload: response.data });
			})
			.catch((error) => {
				dispatch({ type: 'LOGIN_FAIL' });
				setError('Username or Password are incorrect.  Please try again');
			});
	};

	return (
		<div className="flex flex-col justify-center items-center h-[100vh] bg-login bg-cover relative ">
			<form
				className="flex flex-col w-[20%] items-center"
				onSubmit={handleSubmit}
			>
				<input
					type="Username"
					placeholder="Username"
					className="py-2 px-4 mb-4 w-full "
					ref={userRef}
				/>
				<input
					type="password"
					placeholder="Password"
					className="py-2 px-4 mb-4 w-full"
					ref={passwordRef}
				/>
				<button
					className="text-white bg-red-700 w-fit py-1 px-10 rounded-md mb-4"
					type="submit"
				>
					Login
				</button>
			</form>
			{error ? (
				<p className="text-white bg-red-700 py-1 px-2 rounded-md">{error}</p>
			) : null}
			<div className="absolute top-4 right-2 text-white flex items-center">
				<p>Not a Member?</p>
				<button className="mx-2 bg-teal-600 px-4 py-1 rounded-lg">
					<Link to="/register">Register</Link>
				</button>
			</div>
		</div>
	);
};

export default Login;
