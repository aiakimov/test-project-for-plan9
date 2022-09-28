import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import { Books } from "../../interfaces";
import { getFromLocalStorage } from "../../utilities/localStorage";

const Book = () => {
	const getBooks = async (next: string) => {
		const responce = await (await axios.get(next)).data;
		setBooks(responce.results);
		setNextPage(responce.next);
	};
	const [books, setBooks] = useState<Books[]>([]);
	const [viewedBooks, setViewedBooks] = useState<string[]>([]);
	const [nextPage, setNextPage] = useState<string>(
		"https://gutendex.com/books?page=20"
	);

	useEffect(() => {
		getBooks(nextPage);
	}, []);

	useEffect(() => {
		const viewedBooks = getFromLocalStorage();
		viewedBooks && setViewedBooks(viewedBooks);
		console.log(viewedBooks);
	}, []);

	// useEffect(() => {
	// 	document.body.addEventListener("scroll", () => {
	// 		console.log(globalThis.scrollY);
	// 		const height = document.body.scrollHeight;

	// 		if (globalThis.scrollY * 2 == height) {
	// 			console.log("ok");
	// 		}
	// 	});
	// }, []);

	return (
		<>
			<Layout title="BOOKS">
				<h1 className="m-100 font-bold text-text-dark ">akim</h1>
				<ul className="flex flex-wrap gap-10 justify-center">
					{books.map((item) => {
						const itemLink = "/books/" + String(item.id);
						return (
							<Link
								href={itemLink}
								key={item.id}>
								<li
									className={
										viewedBooks.some((el) => {
											el = String(item.id);
										})
											? "w-1/5 h-[450px] cursor-pointer delay-50 hover:shadow-xl hover:transition-all opacity-70"
											: "w-1/5 h-[450px] cursor-pointer delay-50 hover:shadow-xl hover:transition-all"
									}>
									<div
										className="w-full h-full overflow-hidden p-5 flex flex-col justify-between 
													rounded shadow-md relative z-[-1]">
										<h3 className="m-100 font-bold text-text-dark text-xl text-clip text-ellipsis capitalize z-[-1]">
											{item.title.length > 55
												? item.title.slice(0, 55) +
												  "..."
												: item.title}
										</h3>
										<div className="text-right flex flex-col gap-2 justify-end">
											{item.authors.map((item, index) => {
												return (
													<p
														key={index}
														className="text-md text-ellipsis text-clip text-text-default">
														{item.name}
													</p>
												);
											})}
										</div>
										<img
											className="overflow-hidden max-w-[50%] absolute left-[10%] bottom-[110px] max-h-[200px]
										opacity-100 shadow-md rounded z-[-1]"
											src={item.formats["image/jpeg"]}
											alt="book-image"
										/>
									</div>
								</li>
							</Link>
						);
					})}
				</ul>
			</Layout>
		</>
	);
};

export default Book;
