"use client";

import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const Trang = ({ currentPage, totalPages }: { totalPages: number; currentPage: number }) => {
	const currentPath = usePathname();
	if (totalPages < 1) return <></>;

	const generateHref = (pageNum: number) => {
		if (pageNum < 1) {
			return 0;
		} else if (pageNum > totalPages) {
			return totalPages;
		}

		return pageNum;
	};

	return (
		<div className="flex items-center justify-center gap-5">
			<div className="flex gap-3">
				<Link
					className="rounded-lg bg-muted p-2 transition-colors hover:bg-muted-foreground"
					href={{ href: currentPath, query: { page: 0 } }}
				>
					<ChevronsLeft />
				</Link>

				<Link
					className="rounded-lg bg-muted p-2 transition-colors hover:bg-muted-foreground"
					href={{ href: currentPath, query: { page: generateHref(currentPage - 1) } }}
				>
					<ChevronLeft />
				</Link>

				<button className="w-10 flex-auto rounded-lg bg-muted p-2 transition-colors hover:bg-muted-foreground">
					{currentPage}
				</button>

				<Link
					className="rounded-lg bg-muted p-2 transition-colors hover:bg-muted-foreground"
					href={{ href: currentPath, query: { page: generateHref(currentPage + 1) } }}
				>
					<ChevronRight />
				</Link>

				<Link
					className="rounded-lg bg-muted p-2 transition-colors hover:bg-muted-foreground"
					href={{ href: currentPath, query: { page: totalPages } }}
				>
					<ChevronsRight />
				</Link>
			</div>
		</div>
	);
};
