import React from 'react';

const Header = () => {
	return (
		<div className="mt-5 relative">
			<div className=" w-full text-6xl text-gray-200 absolute top-10 text-center font-title ">
				Guitar Blog
			</div>
			<img
				className="w-full h-[350px] object-cover"
				src="https://images.unsplash.com/photo-1650733334625-fbe755c09aa3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2062&q=80"
				alt=""
			/>
		</div>
	);
};

export default Header;
