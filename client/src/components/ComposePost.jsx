import React from 'react';

const ComposePost = () => {
	return (
		<div className="flex-9 flex flex-col mt-4">
			<div className="flex items-center justify-center ml-[36px]">
				<img
					className="w-[82.5%] h-[275px] object-cover rounded-md mb-2"
					src="https://images.unsplash.com/photo-1574767837650-4c92d5b25c7a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1742&q=80"
					alt=""
				/>
			</div>
			<form>
				<div className="flex items-center justify-center w-full ">
					<label htmlFor="fileInput">
						<i class="fa-solid fa-folder-plus text-xl cursor-pointer text-stone-600 p-2"></i>
					</label>
					<input type="file" id="fileInput" className="hidden" />
					<input
						className=" outline-red-500 p-2 w-[80%] text-3xl text-stone-500"
						type="text"
						placeholder="Title"
						autoFocus={true}
					/>
				</div>
				<div className=" flex items-center justify-center">
					<textarea
						className="outline-red-500 border-none p-2 ml-[36px] mt-2 w-[80%] text-stone-500"
						placeholder="Hit Record..."
						id=""
						cols="30"
						rows="10"
					></textarea>
				</div>
				<div className="flex items-center justify-center mt-4">
					<button className=" bg-red-500  py-2 px-4 text-white rounded-md cursor-pointer">
						Save Recording
					</button>
				</div>
			</form>
		</div>
	);
};

export default ComposePost;
