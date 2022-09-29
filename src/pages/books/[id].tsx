import { useRouter } from "next/router";
import axios from "axios";
import { useEffect, useLayoutEffect, useState } from "react";
import { Books } from "../../interfaces";
import Layout from "../../components/Layout";
import { setToLocalStorage } from "../../utilities/localStorage";

const Book = () => {
	const id = String(useRouter().query.id);

	const [book, setBook] = useState<Books[]>([]);

	useEffect(() => {
		axios.get(`https://gutendex.com/books?ids=${id}`).then((responce) => {
			setBook(responce.data.results);
		});
	}, []);

	useEffect(() => {
		setToLocalStorage(id);
	}, []);

	return (
		<Layout title="BOOK">
			<div className=" flex flex-col items-center gap-7 text-center mt-[15%]">
				<h1 className="text-4xl text-text-dark font-bold py-5">
					{book.length ? book[0].title : ""}
				</h1>
				<img
					className="overflow-hidden max-w-[20%] mb-5
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
									<p className="text-2xl text-text-dark font-bold ">
										{item.name}
									</p>
									<p className="text-l text-text-light font-bold tracking-widest">
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
									<li className="text-xs text-text-dark font-bold  italic">
										{item}
									</li>
								);
						  })
						: ""}
				</ul>
			</div>
		</Layout>
	);
};

export default Book;
