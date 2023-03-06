import React from 'react';

const PostDetails = () => {
	return (
		<div className="flex-9 mt-1">
			<div className=" p-2.5 pr-0">
				<img
					className=" w-full h-80 object-cover rounded-md"
					src="https://images.unsplash.com/photo-1574767837650-4c92d5b25c7a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1742&q=80"
					alt=""
				/>
				<div className="flex">
					<h1 className="flex-2 text-3xl text-center font-body">
						Lorem ipsum dolor sit amet.
					</h1>
					<div className="flex-1 text-2xl">
						<i class="fa-solid fa-file-pen ml-2 cursor-pointer text-emerald-600  "></i>
						<i class="fa-solid fa-trash ml-2 cursor-pointer text-red-600 "></i>
					</div>
				</div>
				<div className="flex justify-between mb-4 text-red-500 font-body">
					<span>
						Author: <strong>John Doe</strong>
					</span>
					<span>Posted: 1 hours ago</span>
				</div>
				<p className="text-stone-800 text-lg leading-8">
					Lorem ipsum dolor sit amet, consectetur adipisicing elit. Possimus
					facere aspernatur eligendi sapiente ipsa esse, aut iusto deleniti hic
					recusandae numquam non perspiciatis molestiae dolorem impedit
					blanditiis tempora. Aliquam harum, explicabo eaque rem suscipit qui
					assumenda voluptates tempora doloribus veniam culpa dolor, praesentium
					earum nam sapiente modi quis corrupti quisquam laudantium optio
					doloremque! Quis dolore reprehenderit magni, hic temporibus similique!
					Consequuntur consequatur ea laboriosam, nesciunt dolore sit
					consectetur natus eveniet blanditiis quam laudantium facere tempora
					hic vitae beatae impedit maiores, rerum maxime, iusto magni voluptatem
					non? Commodi nesciunt doloribus voluptas ab ducimus pariatur ex
					repudiandae impedit iusto. Porro, quia alias! Lorem ipsum dolor sit
					amet, consectetur adipisicing elit. Possimus facere aspernatur
					eligendi sapiente ipsa esse, aut iusto deleniti hic recusandae numquam
					non perspiciatis molestiae dolorem impedit blanditiis tempora. Aliquam
					harum, explicabo eaque rem suscipit qui assumenda voluptates tempora
					doloribus veniam culpa dolor, praesentium earum nam sapiente modi quis
					corrupti quisquam laudantium optio doloremque! Quis dolore
					reprehenderit magni, hic temporibus similique! Consequuntur
					consequatur ea laboriosam, nesciunt dolore sit consectetur natus
					eveniet blanditiis quam laudantium facere tempora hic vitae beatae
					impedit maiores, rerum maxime, iusto magni voluptatem non? Commodi
					nesciunt doloribus voluptas ab ducimus pariatur ex repudiandae impedit
					iusto. Porro, quia alias! Lorem ipsum dolor sit amet, consectetur
					adipisicing elit. Possimus facere aspernatur eligendi sapiente ipsa
					esse, aut iusto deleniti hic recusandae numquam non perspiciatis
					molestiae dolorem impedit blanditiis tempora. Aliquam harum, explicabo
					eaque rem suscipit qui assumenda voluptates tempora doloribus veniam
					culpa dolor, praesentium earum nam sapiente modi quis corrupti
					quisquam laudantium optio doloremque! Quis dolore reprehenderit magni,
					hic temporibus similique! Consequuntur consequatur ea laboriosam,
					nesciunt dolore sit consectetur natus eveniet blanditiis quam
					laudantium facere tempora hic vitae beatae impedit maiores, rerum
					maxime, iusto magni voluptatem non? Commodi nesciunt doloribus
					voluptas ab ducimus pariatur ex repudiandae impedit iusto. Porro, quia
					alias!
				</p>
			</div>
		</div>
	);
};

export default PostDetails;
