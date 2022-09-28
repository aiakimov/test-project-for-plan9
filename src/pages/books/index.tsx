import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import { Books } from "../../interfaces";
import { getFromLocalStorage } from "../../utilities/localStorage";

const Book = () => {
	const [books, setBooks] = useState<Books[]>([]);
	const [viewedBooks, setViewedBooks] = useState<string[]>([]);
	const [nextPage, setNextPage] = useState<string>(
		"https://gutendex.com/books?page=1"
	);
	const [request, setRequest] = useState<boolean>(false);

	const scrollHandler = () => {
		if (
			document.documentElement.scrollHeight -
				(document.documentElement.scrollTop + window.innerHeight) <
			100
		) {
			setRequest(true);
		}
	};

	useEffect(() => {
		axios.get(nextPage).then((responce) => {
			setBooks(responce.data.results);
			setNextPage(responce.data.next);
		});
	}, []);

	useEffect(() => {
		document.addEventListener("scroll", scrollHandler);
		return function () {
			document.removeEventListener("scroll", scrollHandler);
		};
	}, []);

	useEffect(() => {
		if (request) {
			axios
				.get(nextPage)
				.then((responce) => {
					setBooks([...books, ...responce.data.results]);
					setNextPage(responce.data.next);
				})
				.finally(() => {
					setRequest(false);
				});
		}
	}, [request]);

	useEffect(() => {
		const viewedBooks = getFromLocalStorage();
		viewedBooks && setViewedBooks(viewedBooks);
		console.log(viewedBooks);
	}, []);

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
										<div className="text-right flex flex-col gap-2 justify-end underline underline-offset-8 decoration-bg-dark">
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
										opacity-100 shadow-xl rounded z-[-1] border-2 border-bg-light "
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
