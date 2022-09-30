import { useEffect } from "react";
import Layout from "../components/Layout";
import { setToLocalStorage } from "../utilities/localStorage";

const IndexPage = () => {
	useEffect(() => {
		const version = process.env.NEXT_PUBLIC_VALUE;
		if (version) {
			setToLocalStorage("VERSION", version);
		}
	});
	return (
		<Layout>
			<div className="bg-red-500 w-1/4 h-80">Hello World!</div>
		</Layout>
	);
};

export default IndexPage;
