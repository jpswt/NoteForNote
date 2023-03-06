import React from 'react';

const Settings = () => {
	return (
		<div className="flex-9 mt-1">
			<div className="flex items-center justify-between mb-6 px-8">
				<span className="text-3xl mb-4 text-emerald-600 ">Update Profile</span>
				<span className="text-sm bg-red-600 text-white px-2 py-1 rounded-sm">
					Delete Account
				</span>
			</div>
			<form className="flex flex-col justify-center items-center relative">
				<p className="absolute top-[-24px] left-[45%]">Profile Pic</p>
				<div className="flex items-center justify-center mb-6">
					<img
						className="w-40 h-40 object-cover rounded-full "
						src="https://images.pexels.com/photos/2325446/pexels-photo-2325446.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
						alt=""
					/>
					<label htmlFor="imgInput">
						<i className="fa-solid fa-user cursor-pointer text-3xl ml-4 text-red-500 "></i>
					</label>
					<input type="file" id="imgInput" className="hidden" />
				</div>
				<input type="text" placeholder="Name" className="p-4 my-2 w-[40%]" />
				<input type="text" placeholder="Email" className="p-4 my-2 w-[40%]" />
				<input
					type="password"
					placeholder="Password"
					className="p-4 my-2 w-[40%]"
				/>
				<button className="w-40 bg-emerald-500 text-white py-2 rounded-md mt-2 cursor-pointer">
					Update Profile
				</button>
			</form>
		</div>
	);
};

export default Settings;
