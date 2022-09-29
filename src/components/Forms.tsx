import { FC, useEffect, useState } from "react";

import { Filters, PropsForm } from "../interfaces";

const Forms: FC<PropsForm> = ({
	filters,
	setFilters,
	searchValue,
	setSearchValue,
	setStartSearch,
}) => {
	const [innerValues, setInnerValues] = useState<Filters>({
		EN: false,
		FR: false,
		FI: false,
	});
	const [innerSearchValue, setInnerSearchValue] = useState("");

	useEffect(() => {
		setFilters(innerValues);
	}, [innerValues]);

	useEffect(() => {
		setSearchValue(innerSearchValue);
	}, [innerSearchValue]);

	return (
		<div className="flex justify-between static h-[70px] w-full py-[10px] ">
			<div className="flex justify-center gap-3 w-[40%] items-center">
				<input
					name="EN"
					type="checkbox"
					checked={filters.EN}
					onChange={(e) => {
						setInnerValues({ ...innerValues, EN: !innerValues.EN });
					}}
					className="w-[20px] h-[20px] border-[2px] border-text-light rounded-md cursor-pointer appearance-none checked:bg-text-light  ml-[10px]"
				/>
				<label
					className="text-text-dark bold"
					htmlFor="EN">
					EN
				</label>
				<input
					name="FR"
					type="checkbox"
					checked={filters.FR}
					onChange={(e) => {
						setInnerValues({ ...innerValues, FR: !innerValues.FR });
					}}
					className="w-[20px] h-[20px] border-[2px] border-text-light rounded-md cursor-pointer appearance-none checked:bg-text-light  ml-[10px]"
				/>
				<label
					className="text-text-dark bold"
					htmlFor="FR">
					FR
				</label>
				<input
					name="FI"
					type="checkbox"
					checked={filters.FI}
					onChange={(e) => {
						setInnerValues({ ...innerValues, FI: !innerValues.FI });
					}}
					className="w-[20px] h-[20px] border-[2px] border-text-light rounded-md cursor-pointer appearance-none checked:bg-text-light  ml-[10px]"
				/>
				<label
					className="text-text-dark bold"
					htmlFor="FI">
					FI
				</label>
			</div>
			<div className=" flex justify-center gap-5 w-[40%]">
				<input
					type="text"
					placeholder="Search the book"
					className=" text-text-dark w-[50%] h-[50px] border border-text-dark  text-right p-[15px] bold
						cursor-text delay-50 hover:shadow-xl hover:transition-all rounded shadow-bg-light shadow-xl"
					value={searchValue}
					onChange={(e) => {
						setInnerSearchValue((searchValue = e.target.value));
					}}
					onKeyDown={(e) => {
						if (e.key == "Enter") {
							setStartSearch(true);
						}
					}}
				/>
				<button
					onClick={() => {
						setStartSearch(true);
					}}
					className="w-[20%] border border-text-dark font-bold rounded
					cursor-pointer delay-50 hover:shadow-xl hover:bg-text-light hover:text-bg-light
					hover:shadow-bg-light hover:border-2 hover:border-text-light active:border-bg-light hover:transition-all bg-bg-dark shadow-bg-light shadow-xl">
					GO!
				</button>
			</div>
		</div>
	);
};
export default Forms;
