import React from 'react';

const Header = () => {
	return (
		<div className="relative w-full flex items-center justify-center">
			<div className="w-full min-h-full primary opacity-[45%] absolute"></div>
			<div className=" w-full text-6xl text-gray-100 absolute top-20 left-[9.2rem] font-title ">
				<h2 className="text-[6rem]">Dial it up.</h2>
				<p className="mt-6 text-[1.5rem] ml-2 w-[30%]">
					Discover new gear and unlock tones with tips from fellow musicians.
				</p>
			</div>
			<button className="absolute">Start Reading</button>
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
