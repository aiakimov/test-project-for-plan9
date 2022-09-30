import axios from "axios";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import Forms from "../../components/Forms";
import Layout from "../../components/Layout";
import { Books, Filters } from "../../interfaces";
import {
	getCardFromLocalStorage,
	setToLocalStorage,
} from "../../utilities/localStorage";

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
	const [searchValue, setSearchValue] = useState<string>("");
	const [filterReq, setFilterReq] = useState<string>(
		"https://gutendex.com/books?"
	);
	const [startSearch, setStartSearch] = useState<boolean>(false);

	useEffect(() => {
		const version = process.env.NEXT_PUBLIC_VALUE;
		if (version) {
			setToLocalStorage("VERSION", version);
		}
	}, []);

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
		const localStorageArr = getCardFromLocalStorage();
		if (localStorageArr) {
			setViewedBooks(localStorageArr);
		}
	}, []);

	useEffect(() => {
		axios.get(filterReq).then((responce) => {
			setBooks(responce.data.results);
			setNextPage(responce.data.next);
		});
	}, [filterReq]);

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
	}, [startSearch, filterReq, searchValue]);

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
	}, [request, books, nextPage]);

	useEffect(() => {
		const viewedBooks = getCardFromLocalStorage();
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
									setStartSearch(true);
								}}
								className="px-[20px] py-[10px] border border-text-dark font-bold rounded
					cursor-pointer delay-50 hover:shadow-xl hover:bg-text-light hover:text-bg-light
					hover:shadow-bg-light hover:border-2 hover:border-text-light active:border-bg-light hover:transition-all bg-bg-dark shadow-bg-light shadow-xl">
								Back
							</button>
						</div>
					)}
					{books.map((item) => {
						const itemLink = "/books/" + String(item.id);
						return (
							<Link
								key={item.id}
								href={itemLink}>
								<li
									className="xl:w-[20%] xl:h-[450px] lg:w-[27%] lg:h-[420px] md:w-[40%] md:h-[400px] sm:w-[40%] sm:h-[400px] w-[90%] h-[50vh] cursor-pointer delay-50 hover:shadow-xl 
									hover:transition-all">
									<div
										className={
											viewedBooks
												? viewedBooks.find((el) => {
														return (
															Number(el) ==
															item.id
														);
												  }) != undefined
													? "w-full h-full overflow-hidden p-5 flex flex-col justify-between rounded shadow-md relative -z-10  opacity-50 "
													: "w-full h-full overflow-hidden p-5 flex flex-col justify-between rounded shadow-md relative -z-10  "
												: "w-full h-full overflow-hidden p-5 flex flex-col justify-between rounded shadow-md relative -z-10 "
										}>
										<h3
											className="m-100 font-bold text-text-dark xl:text-xl text-clip text-ellipsis capitalize
														text-l">
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
											className="overflow-hidden max-w-[60%]  absolute left-[10%] lg:top-[130px] top-[25%] max-h-[200px]
										opacity-100 shadow-xl rounded border-2 border-bg-light "
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
