import React from 'react';

const SingePost = () => {
	return (
		<div className="w-[400px] mx-8 mb-3 ">
			<img
				className="w-full h-[275px] object-cover rounded-sm"
				src="https://images.unsplash.com/photo-1574767837650-4c92d5b25c7a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1742&q=80"
				alt=""
			/>
			<div className="flex flex-col items-center justify-center">
				<div className=" ">
					<span className="font-body text-red-600 font-medium text-small mt-2 mr-2 cursor-pointer">
						Bass
					</span>
					<span className="font-body text-red-600 font-medium text-small mt-2 mr-2 cursor-pointer">
						Tone
					</span>
				</div>
				<span className="text-xl font-semibold mt-1">Lorem ipsum.</span>
				<hr />
				<span className="font-body italic text-base text-stone-600">
					Posted: 1 hour ago
				</span>
			</div>
			<p className="text-stone-800 mt-2 leading-6 line-clamp-4 text-ellipsis">
				Lorem ipsum, dolor sit amet consectetur adipisicing elit. Unde hic dolor
				tenetur quod inventore, natus, architecto dolore magnam beatae doloribus
				possimus? Voluptate iure, iusto explicabo dolore sunt magnam molestias
				voluptas maiores nisi, id quis non quisquam dolorem at vel aliquam
				laborum veritatis ullam eum tempore harum alias corrupti rerum. Soluta!
				Lorem ipsum, dolor sit amet consectetur adipisicing elit. Unde hic dolor
				tenetur quod inventore, natus, architecto dolore magnam beatae doloribus
				possimus? Voluptate iure, iusto explicabo dolore sunt magnam molestias
				voluptas maiores nisi, id quis non quisquam dolorem at vel aliquam
				laborum veritatis ullam eum tempore harum alias corrupti rerum. Soluta!
				Lorem ipsum, dolor sit amet consectetur adipisicing elit. Unde hic dolor
				tenetur quod inventore, natus, architecto dolore magnam beatae doloribus
				possimus? Voluptate iure, iusto explicabo dolore sunt magnam molestias
				voluptas maiores nisi, id quis non quisquam dolorem at vel aliquam
				laborum veritatis ullam eum tempore harum alias corrupti rerum. Soluta!
			</p>
		</div>
	);
};

export default SingePost;
