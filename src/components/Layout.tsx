import Link from "next/link";
import Head from "next/head";
import React, { ReactNode } from "react";

type Props = {
	children?: ReactNode;
	title?: string;
};

const Layaut = ({ children, title = "TEST PROJECT FOR PLAN9" }: Props) => {
	return (
		<>
			<Head>
				<title>{title}</title>
				<meta
					name="description"
					content="books"
				/>
			</Head>
			<header className="sticky inset-0">
				<nav className="flex flex-wrap bg-bg-light gap-10 justify-center py-5 z-50 opacity-100">
					<Link href="/">
						<a className="text-text-default hover:text-text-dark text-2xl hover:transition-all z-[999]">
							Home
						</a>
					</Link>
					<Link href="/books">
						<a className="text-text-default hover:text-text-dark text-2xl hover:transition-all z-[999]">
							Books
						</a>
					</Link>
				</nav>
			</header>
			<main className="">
				<div className="container mx-auto pb-[50px] bg-emerald-50">
					{children}
				</div>
			</main>
			<footer className="fixed bottom-0 w-full flex justify-center text-text-light bg-bg-dark ">
				<hr />
				<h4>
					Test Progect For <span className="font-bold">Plan9</span>
				</h4>
			</footer>
		</>
	);
};

export default Layaut;
