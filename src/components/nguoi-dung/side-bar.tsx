"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import type { ReactNode } from "react";

export const NguoiDungSideBar = () => {
	const currentPath = usePathname();

	return (
		<div className="flex h-max w-1/5 flex-col items-center justify-center gap-1 rounded-lg bg-muted p-1 text-muted-foreground">
			<div className="w-full">
				<TabItem currentPath={currentPath} href={"/auth/nguoi-dung/thong-tin-chung"}>
					Thông tin chung
				</TabItem>
			</div>

			<div className="w-full">
				<TabItem currentPath={currentPath} href={"/auth/nguoi-dung/tin-da-luu"}>
					Tin đã lưu
				</TabItem>
			</div>

			<div className="w-full">
				<TabItem currentPath={currentPath} href={"/auth/nguoi-dung/tin-da-xem"}>
					Tin đã xem
				</TabItem>
			</div>
		</div>
	);
};

const TabItem = ({ href, currentPath, children }: { href: string; currentPath: string; children: ReactNode }) => {
	const isActive = currentPath == href;

	return (
		<button className={`w-full rounded-lg p-3 ${isActive ? "dark:bg-[#0a0a0a] dark:text-white" : "bg-transparent"}`}>
			<Link href={href}>{children}</Link>
		</button>
	);
};
