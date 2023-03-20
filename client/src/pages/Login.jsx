import React, { useState, useContext, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Context } from '../context/Context';
import axios from 'axios';
import guitarPick from '../assets/guitar-pick.png';
import logo from '../assets/n4n.png';

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
		<div className="flex flex-col justify-center items-center h-[100vh] bg-primary ">
			<img src={guitarPick} alt="" className="w-20 h-20" />
			<img src={logo} alt="" className="mt-2" />
			<div className="flex flex-col items-center justify-center ">
				<form
					className="flex flex-col w-full items-center relative mt-14"
					onSubmit={handleSubmit}
				>
					<label htmlFor="" className="">
						<i className="fa-solid fa-user text-xl text-gray-400 absolute top-[.5rem] left-3"></i>
					</label>
					<input
						type="text"
						placeholder="Email"
						className="py-2.5 pl-10 w-[17rem] mb-4 border-b-2  border-gray-500 bg-primary outline-none caret-gray-200 text-gray-200 accent-input"
						autoFocus={true}
						ref={userRef}
					/>
					<label htmlFor="">
						<i className="fa-solid fa-lock text-xl text-gray-400 absolute top-[4.4rem] left-3"></i>
					</label>
					<input
						type="password"
						placeholder="Password"
						className="py-2.5 pl-10 w-[17rem] border-b-2 border-gray-500 bg-primary outline-none caret-gray-200 text-gray-200 accent-input"
						ref={passwordRef}
					/>
					<button
						className="mt-6 text-gray-200 bg-[#339a9a] w-fit py-1 px-[6.5rem] rounded-md mb-4 text-lg "
						type="submit"
					>
						LOGIN
					</button>
				</form>
				{error ? (
					<p className="text-gray-300 py-1 px-2 rounded-md ">{error}</p>
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
