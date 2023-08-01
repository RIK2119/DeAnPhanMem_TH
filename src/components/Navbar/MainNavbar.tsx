"use client";

import type { User } from "@clerk/clerk-sdk-node";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { Bell, TimerIcon, UserCircle } from "lucide-react";

import { Separator } from "@ui/separator";
import { RealTime } from "./Realtime";
import { UserDropdown } from "./userDropdown";
import { SearchBar } from "./SearchBar";

const MainNavbar = ({ user }: { user: User | null }) => {
	const currentPath = usePathname();

	return (
		<nav className="fixed top-0 z-50 w-full backdrop-blur-md backdrop-saturate-150">
			<section className="border-b-[1px] border-black/50 py-5">
				<main className="container mx-auto flex items-center justify-between px-3">
					<div className="flex h-7 items-center space-x-4">
						<Link href="/" className="w-max text-2xl">
							<h2 className="w-max font-bold">Bản tin 24H</h2>
						</Link>

						<Separator orientation="vertical" className="bg-black dark:bg-white" />

						<RealTime />
					</div>

					<div className="flex h-7 w-full items-center justify-end space-x-4 text-sm">
						<Link className="flex items-center justify-center gap-2" href="/tin-tuc-24h" title="Tin tức mới nhất trong 24h qua">
							<TimerIcon />
							Mới nhất
						</Link>

						<Separator orientation="vertical" className="bg-black dark:bg-white" />

						<SearchBar />

						{user ? (
							<UserDropdown user={user} />
						) : (
							<Link
								href={{
									pathname: "/auth/dang-nhap",
									query: { redirect_url: currentPath },
								}}
								className="flex items-center justify-center gap-2"
							>
								<UserCircle size={20} />
								<span>Đăng Nhập</span>
							</Link>
						)}

						<button>
							<Bell size={20} />
						</button>
					</div>
				</main>
			</section>
		</nav>
	);
};

export { MainNavbar };
