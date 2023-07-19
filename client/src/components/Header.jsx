import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
	return (
		<div className="relative flex w-full items-center justify-center">
			<div className="primary absolute min-h-full w-full opacity-[50%]"></div>
			<div className=" absolute top-[24%] left-[8.5%] w-full font-title text-gray-100 sm:left-[2.0rem] ">
				<h2 className="text-[5.7rem] sm:text-[3.5rem]">Dial it up</h2>
				<div className="mt-8 ml-2 w-fit text-[1.5rem] leading-7 sm:mt-4 sm:ml-1 sm:text-[1.2rem] sm:leading-5">
					<p>Discover new music, gear and unlock</p>
					<p>tones with tips from fellow musicians.</p>
				</div>
				<button className="accent absolute mt-6 rounded-md border-2 border-gray-300 border-opacity-30 py-1 px-4 text-[1.5rem] text-gray-100 sm:mt-4 sm:py-1 sm:px-2 sm:text-[1.1rem]">
					<Link to="/register"> Get Started </Link>
				</button>
			</div>
			<img
				className="h-[300px] w-full object-cover"
				src="https://images.pexels.com/photos/1539789/pexels-photo-1539789.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
				alt="image of a blue guitar laying vertically"
			/>
		</div>
	);
};

export default Header;
