import Link from "next/link";
import Head from "next/head";
import Container from "next";
import React, { ReactNode } from "react";

type Props = {
	children?: ReactNode;
	title?: string;
};

const Layaut = ({ children, title = "TEST PROJECT FOR Plan 9" }: Props) => {
	return (
		<>
			<Head>
				<title>TEST PROJECT FOR PLAN9</title>
				<meta
					name="description"
					content="books"
				/>
				<link
					rel="preconnect"
					href="https://fonts.googleapis.com"
				/>
				<link
					rel="preconnect"
					href="https://fonts.gstatic.com"
				/>
				<link
					href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,300;0,400;0,600;1,400&display=swap"
					rel="stylesheet"
				/>
			</Head>
			<header className="sticky inset-0  ">
				<nav className="flex flex-wrap bg-bg-dark gap-10 justify-center py-5 z-[9999]">
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
			<main>
				<div className="container mx-auto z-0 pb-[50px]">{children}</div>
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
