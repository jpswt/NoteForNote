import React from 'react';

const Header = () => {
	return (
		<div className="relative w-full flex items-center justify-center">
			<div className="w-full min-h-full primary opacity-60 absolute"></div>
			<div className=" w-full text-6xl text-gray-200 absolute top-10 text-center font-title ">
				Guitar Blog
			</div>
			<img
				className="w-full h-[300px] object-cover"
				// src="https://images.unsplash.com/photo-1650733334625-fbe755c09aa3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2062&q=80"
				src="https://images.pexels.com/photos/1539789/pexels-photo-1539789.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
				alt=""
			/>
		</div>
	);
};

export default Header;
