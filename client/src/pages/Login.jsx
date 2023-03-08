import React, { useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
	const navigate = useNavigate();
	const userRef = useRef();
	const passwordRef = useRef();

	const handleSubmit = (e) => {
		e.preventDefault();
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
					className="text-white bg-red-500 w-fit py-1 px-10 rounded-md"
					type="submit"
				>
					<Link to="/login">Login</Link>
				</button>
			</form>
			<div className="absolute top-4 right-2 text-white flex items-center">
				<p>Not a Member?</p>
				<button className="mx-2 bg-emerald-600 px-4 py-1 rounded-lg">
					<Link to="/register">Register</Link>
				</button>
			</div>
		</div>
	);
};

export default Login;
