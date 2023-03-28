import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
	return (
		<div className="relative w-full flex items-center justify-center">
			<div className="w-full min-h-full primary opacity-[50%] absolute"></div>
			<div className=" w-full text-6xl text-gray-100 absolute top-20 left-[8.0rem] font-title ">
				<h2 className="text-[5.7rem]">Dial it up</h2>
				<div className="mt-8 text-[1.5rem] ml-2 w-fit leading-7">
					<p>Discover new music, gear and unlock</p>
					<p>tones with tips from fellow musicians.</p>
				</div>
				<button className="absolute mt-6 accent text-gray-100 py-2 px-4 text-[1.5rem] rounded-md border-2 border-gray-300 border-opacity-30">
					<Link to="/register"> Get Started </Link>
				</button>
			</div>
			<img
				className="w-full h-[300px] object-cover"
				src="https://images.pexels.com/photos/1539789/pexels-photo-1539789.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
				alt=""
			/>
		</div>
	);
};

export default Header;
