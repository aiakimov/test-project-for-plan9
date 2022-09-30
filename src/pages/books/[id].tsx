import { useRouter } from "next/router";
import Image from "next/image";
import axios from "axios";
import { useEffect, useState } from "react";
import { Books } from "../../interfaces";
import Layout from "../../components/Layout";
import {
	setCardToLocalStorage,
	setToLocalStorage,
} from "../../utilities/localStorage";
import Link from "next/link";

const Book = () => {
	const id = String(useRouter().query.id);

	const [book, setBook] = useState<Books[]>([]);

	useEffect(() => {
		axios.get(`https://gutendex.com/books?ids=${id}`).then((responce) => {
			setBook(responce.data.results);
		});
	}, [id]);

	useEffect(() => {
		setCardToLocalStorage(id);
	}, [id]);

	useEffect(() => {
		const version = process.env.NEXT_PUBLIC_VALUE;
		if (version) {
			setToLocalStorage("VERSION", version);
		}
	}, []);

	return (
		<Layout title="BOOK">
			<div className=" flex flex-col items-center gap-7 text-center lg:mt-[10%] mt-[20px] lg:p-0 p-5">
				<h1 className="md:text-4xl text-2xl text-text-dark font-bold py-5">
					{book.length ? book[0].title : ""}
				</h1>
				<img
					className="overflow-hidden lg:max-w-[30%] max-w-[60%] mb-5
							opacity-100 shadow-2xl rounded 
							border border-bg-dark"
					src={book.length ? book[0].formats["image/jpeg"] : ""}
					alt="book-image"
				/>
				{book.length
					? book[0].authors.map((item) => {
							return (
								<div
									key={item.name}
									className="flex flex-col items-center">
									<p className="md:text-2xl text-xl text-text-dark font-bold ">
										{item.name}
									</p>
									<p className="text-l text-text-light font-bold tracking-widest mt-2">
										{item.birth_year
											? Math.abs(item.birth_year)
											: "?"}
										-
										{item.death_year
											? Math.abs(item.death_year)
											: "?"}
									</p>
								</div>
							);
					  })
					: ""}
				<ul className="flex gap-4 flex-wrap justify-center">
					{book.length && book[0].subjects?.length
						? book[0].subjects.map((item) => {
								return (
									<li
										key={item}
										className="text-xs text-text-dark font-bold  italic">
										{item}
									</li>
								);
						  })
						: ""}
				</ul>
				<Link
					rel="stylesheet"
					href="/books">
					<p
						className="px-[20px] py-[10px] border border-text-dark font-bold rounded
					cursor-pointer delay-50 hover:shadow-xl hover:bg-text-light hover:text-bg-light
					hover:shadow-bg-light hover:border-2 hover:border-text-light active:border-bg-light hover:transition-all bg-bg-dark shadow-bg-light shadow-xl">
						Back To List
					</p>
				</Link>
			</div>
		</Layout>
	);
};

export default Book;
