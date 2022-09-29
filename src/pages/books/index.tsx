import axios from "axios";
import Link from "next/link";
import { useEffect, useState, useLayoutEffect } from "react";
import Forms from "../../components/Forms";
import Layout from "../../components/Layout";
import { Books, Filters } from "../../interfaces";
import { getFromLocalStorage } from "../../utilities/localStorage";

const Book = () => {
	const [books, setBooks] = useState<Books[]>([]);
	const [viewedBooks, setViewedBooks] = useState<string[]>([]);
	const [nextPage, setNextPage] = useState<string>("");
	const [request, setRequest] = useState<boolean>(false);
	const [filters, setFilters] = useState<Filters>({
		EN: false,
		FR: false,
		FI: false,
	});
	const [searchValue, setSearchValue] = useState("");
	const [filterReq, setFilterReq] = useState("https://gutendex.com/books?");
	const [startSearch, setStartSearch] = useState(false);

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
		axios.get(filterReq).then((responce) => {
			setBooks(responce.data.results);
			setNextPage(responce.data.next);
		});
	}, []);

	useEffect(() => {
		axios.get(filterReq).then((responce) => {
			setBooks(responce.data.results);
			setNextPage(responce.data.next);
		});
	}, [filterReq]);

	useEffect(() => {
		let request = "https://gutendex.com/books?";
		if (filters.EN) {
			request = "https://gutendex.com/books?&languages=en";
		}
		if (filters.FR) {
			request = "https://gutendex.com/books?&languages=fr";
		}
		if (filters.FI) {
			request = "https://gutendex.com/books?&languages=fi";
		}
		if (filters.EN && filters.FR) {
			request = "https://gutendex.com/books?&languages=en,fr";
		}
		if (filters.FI && filters.FR) {
			request = "https://gutendex.com/books?&languages=fr,fi";
		}
		if (filters.EN && filters.FI) {
			request = "https://gutendex.com/books?&languages=en,fi";
		}
		if (filters.EN && filters.FR && filters.FI) {
			request = "https://gutendex.com/books?&languages=en,fr,fi";
		}
		setFilterReq(request);
	}, [filters]);

	useEffect(() => {
		if (startSearch) {
			setFilterReq(filterReq + "&search=" + searchValue);
			setStartSearch(false);
			setSearchValue("");
		}
	}, [startSearch]);

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
	}, []);

	return (
		<>
			<Layout title="BOOKS">
				<Forms
					filters={filters}
					setFilters={setFilters}
					searchValue={searchValue}
					setSearchValue={setSearchValue}
					setStartSearch={setStartSearch}
				/>
				<ul className="flex flex-wrap gap-20 justify-center mt-[50px]">
					{books.length ? (
						""
					) : (
						<div className="flex flex-col items-center gap-[50px]">
							<p className="text-text-dark bold text-l">
								no results...
							</p>
								<button
									onClick={() => {
										setStartSearch(true)
									}}
									className="px-[20px] py-[10px] border border-text-dark font-bold rounded
					cursor-pointer delay-50 hover:shadow-xl hover:bg-text-light hover:text-bg-light
					hover:shadow-bg-light hover:border-2 hover:border-text-light active:border-bg-light hover:transition-all bg-bg-dark shadow-bg-light shadow-xl">
									Go Back
								</button>
						</div>
					)}
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
											: "w-1/5 h-[450px] cursor-pointer delay-50 hover:shadow-xl hover:transition-all "
									}>
									<div
										className="w-full h-full overflow-hidden p-5 flex flex-col justify-between 
													rounded shadow-md relative z-[-1]">
										<h3 className="m-100 font-bold text-text-dark text-xl text-clip text-ellipsis capitalize z-[-1]">
											{item.title.length > 50
												? item.title.slice(0, 50) +
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
											className="overflow-hidden max-w-[60%] absolute left-[10%] top-[130px] max-h-[200px]
										opacity-100 shadow-xl rounded z-[-1] border-2 border-bg-light "
											src={item.formats["image/jpeg"]}
											alt="book-image"
										/>
									</div>
									<p className="block text-text-light text-xs mt-[10px]">
										downloads : {item.download_count}
									</p>
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
