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
				email: userRef.current.value,
				password: passwordRef.current.value,
			})
			.then((response) => {
				dispatch({ type: 'LOGIN_SUCCESS', payload: response.data });
				document.cookie = `loggedIn=true;max-age=60*1000`;
			})
			.catch((error) => {
				dispatch({ type: 'LOGIN_FAIL' });
				setError('Email or Password are incorrect.  Please try again.');
			});
	};

	return (
		<div className="flex flex-col justify-center items-center h-[100vh] bg-primary bg-cover relative ">
			<div className="w-1/4 h-1/2 flex flex-col items-center justify-center ">
				<form
					className="flex flex-col w-full items-center relative"
					onSubmit={handleSubmit}
				>
					<label htmlFor="" className="">
						<i className="fa-solid fa-user text-xl text-gray-400 absolute top-3 left-14"></i>
					</label>
					<input
						type="text"
						placeholder="Email"
						className="py-3 pl-10 mb-4 border-y-2 border-gray-400 bg-primary outline-none caret-gray-600 text-gray-600 w-[75%]"
						autoFocus={true}
						ref={userRef}
					/>
					<label htmlFor="">
						<i className="fa-solid fa-lock text-xl text-gray-400 absolute top-20 left-14"></i>
					</label>
					<input
						type="password"
						placeholder="Password"
						className="py-3 pl-10 mb-8 border-y-2 border-gray-400 bg-primary outline-none caret-gray-600 text-gray-600 w-[75%]"
						ref={passwordRef}
					/>
					<button
						className="text-white bg-[#339a9a] w-fit py-1 px-[7rem] rounded-md mb-4 "
						type="submit"
					>
						LOGIN
					</button>
				</form>
				{error ? (
					<p className="text-gray-100 py-1 px-2 rounded-md">{error}</p>
				) : null}
				{/* <div className="absolute top-4 right-2 text-white flex items-center">
					<p>Not a Member?</p>
					<button className="mx-2 bg-teal-600 px-4 py-1 rounded-lg">
						<Link to="/register">Register</Link>
					</button>
				</div> */}
			</div>
		</div>
	);
};

export default Login;
