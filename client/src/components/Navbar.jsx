import React from 'react';

const Navbar = () => {
	return (
		<div className=" w-full h-[50px] sticky top-0 z-10 flex items-center justify-between font-display bg-stone-200">
			{/* <div className="flex content-center">logo</div> */}
			<div className="flex items-center content-center mx-8">
				<ul className="flex gap-8">
					<li className=" text-lg font-light text-stone-800 cursor-pointer ">
						HOME
					</li>
					<li className="text-lg font-light text-stone-800 cursor-pointer ">
						ABOUT
					</li>
					<li className="text-lg font-light text-stone-800 cursor-pointer ">
						CONTACT
					</li>
					<li className="text-lg font-light text-stone-800 cursor-pointer ">
						COMPOSE
					</li>
					<li className="text-lg font-light text-stone-800 cursor-pointer ">
						LOGOUT
					</li>
				</ul>
			</div>
			<div className="flex items-center content-center mr-4">
				<img
					src="https://images.pexels.com/photos/2325446/pexels-photo-2325446.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
					alt=""
					className="w-[40px] h-[40px] rounded-full object-cover"
				/>
				<i className="fa-solid fa-magnifying-glass text-lg text-stone-800 ml-4 "></i>
			</div>
		</div>
	);
};

export default Navbar;
