import React from 'react';
import { Link } from 'react-router-dom';

const Register = () => {
	return (
		<div className="flex flex-col justify-center items-center h-[calc(100vh-50px)] bg-login bg-cover relative ">
			<form className="flex flex-col w-[20%] items-center">
				<input
					type="text"
					placeholder="Username "
					className="py-2 px-4 mb-4 w-full "
				/>
				<input
					type="email"
					placeholder="Email"
					className="py-2 px-4 mb-4 w-full "
				/>
				<input
					type="password"
					placeholder="Password"
					className="py-2 px-4 mb-4 w-full"
				/>
				<button className="text-white bg-red-500 w-fit py-1 px-10 rounded-md">
					Register
				</button>
			</form>
			<div className="absolute top-4 right-2 text-white flex items-center">
				<p>Already a Member?</p>
				<button className="mx-2 bg-emerald-600 px-4 py-1 rounded-lg">
					<Link to="/login">Login</Link>
				</button>
			</div>
		</div>
	);
};

export default Register;
