import React, { useState, useContext, useRef } from 'react';
import { Context } from '../context/Context';
import axios from 'axios';
import guitarPick from '../assets/guitar-pick.png';
import logo from '../assets/nfn2.png';

const Login = () => {
	const userRef = useRef();
	const passwordRef = useRef();
	const [error, setError] = useState('');

	const { dispatch, fetched } = useContext(Context);

	const handleSubmit = async (e) => {
		e.preventDefault();
		dispatch({ type: 'LOGIN_START' });

		await axios
			.post(`${import.meta.env.VITE_NFN_URI}/auth/login`, {
				email: userRef.current.value,
				password: passwordRef.current.value,
			})
			.then((response) => {
				dispatch({ type: 'LOGIN_SUCCESS', payload: response.data });
			})
			.catch((error) => {
				dispatch({ type: 'LOGIN_FAIL' });
				setError('Email or Password are incorrect.  Please try again.');
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
					<label htmlFor="email">
						<i className="fa-solid fa-user absolute top-[.5rem] left-3 text-xl text-gray-400"></i>
					</label>
					<input
						type="email"
						placeholder="Email"
						className="bg-primary accent-input mb-4 w-[17rem] border-b-2  border-gray-500 py-2.5 pl-10 text-gray-200 caret-gray-200 outline-none"
						autoFocus={true}
						ref={userRef}
					/>
					<label htmlFor="password">
						<i className="fa-solid fa-lock absolute top-[4.4rem] left-3 text-xl text-gray-400"></i>
					</label>
					<input
						type="password"
						placeholder="Password"
						className="bg-primary accent-input w-[17rem] border-b-2 border-gray-500 py-2.5 pl-10 text-gray-200 caret-gray-200 outline-none"
						ref={passwordRef}
					/>
					<button
						className="accent mt-6 mb-4 w-fit rounded-md px-[6.6rem] pt-1 font-title text-lg text-gray-200 "
						type="submit"
					>
						LOGIN
					</button>
				</form>
				{error ? (
					<p className="rounded-md py-1 px-2 text-gray-300 ">{error}</p>
				) : null}
			</div>
			<div style={{ background: 'lightgray', padding: '0 1rem' }}>
				<p style={{ textAlign: 'center', fontWeight: 'bold' }}>Demo</p>
				<p>email: testuser1@gmail.com</p>
				<p>password: D3m0PwD@5! </p>
			</div>
		</div>
	);
};

export default Login;
