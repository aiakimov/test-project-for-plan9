import { useRouter } from "next/router";
import axios from "axios";
import { useEffect, useLayoutEffect, useState } from "react";
import { Books } from "../../interfaces";
import Layaut from "../../components/Layout";
import { setToLocalStorage } from "../../utilities/localStorage";

const Book = () => {
	const id = String(useRouter().query.id);

	const getBooks = async (id: string) => {
		const responce = await (
			await axios.get("https://gutendex.com/books?ids=" + id)
		).data;
		setBook(responce.results);
	};

	const [book, setBook] = useState<Books[]>([]);

	useEffect(() => {
		getBooks(String(id));
	}, []);

	useEffect(() => {
		setToLocalStorage(id);
	}, []);

	return (
		<Layaut>
			<h1>{book.length ? book[0].title : ""}</h1>
			{book.length
				? book[0].authors.map((item) => {
						return (
							<div
								key={item.name}
								className="flex flex-col">
								<p>{item.name}</p>
								<p className="text-sm text-text-light italic">
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
			<ul className="flex gap-10">
				{book.length && book[0].subjects?.length
					? book[0].subjects.map((item) => {
							return <li>{item}</li>;
					  })
					: ""}
			</ul>
		</Layaut>
	);
};

export default Book;
