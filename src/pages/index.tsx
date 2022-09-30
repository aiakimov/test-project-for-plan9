import Link from "next/link";
import { useEffect } from "react";
import Layout from "../components/Layout";
import { setToLocalStorage } from "../utilities/localStorage";

const IndexPage = () => {
	useEffect(() => {
		const version = process.env.NEXT_PUBLIC_VALUE;
		if (version) {
			setToLocalStorage("VERSION", version);
		}
	}, []);
	return (
		<Layout>
			<h1 className="text-text-dark bolt text-4xl text-center mt-[10%] px-[5%] tracking-wide leading-loose">
				Hello! My name is Alexey Akimov. This is my test project for
				PLAN9
			</h1>
			<h2 className="text-text-dark bolt text-xl text-center mt-[5%] tracking-wide">
				click on the
				<Link href={"/books"}>
					<a
						className="underline decoration-bg-dark underline-offset-8 pointer tracking-widest mx-[7px]"
						href="#">
						Books
					</a>
				</Link>
				!
			</h2>
		</Layout>
	);
};

export default IndexPage;
