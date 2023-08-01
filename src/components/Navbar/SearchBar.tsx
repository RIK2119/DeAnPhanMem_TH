"use client";

import { Search } from "lucide-react";
import Link from "next/link";
import { useRef, useState } from "react";

export const SearchBar = () => {
	const [isExpended, setExpended] = useState(false);
	const [query, setQuery] = useState("");

	const aRef = useRef<HTMLAnchorElement>(null);

	return (
		<form
			className={`flex w-max gap-2 rounded-lg px-3 transition-all ${isExpended ? "bg-muted" : "bg-transparent"}`}
			onSubmit={(event) => {
				event.preventDefault();
				aRef.current?.click();
			}}
		>
			<Link ref={aRef} href={{ pathname: "/timkiem", query: { query } }}></Link>

			{isExpended && (
				<div className={isExpended ? "w-max" : "w-0"}>
					<input
						type="text"
						name="query"
						className="bg-transparent py-2 focus:outline-none"
						onChange={(event) => setQuery(event.currentTarget.value)}
					/>
				</div>
			)}

			<button
				type="button"
				onClick={(event) => {
					event.preventDefault();

					if (!isExpended) setExpended(true);
					else aRef.current?.click();
				}}
			>
				<Search size={20} />
			</button>
		</form>
	);
};
