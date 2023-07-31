"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { SignOutButton } from "@clerk/nextjs";

import type { ReactNode } from "react";

export const NguoiDungSideBar = () => {
	const currentPath = usePathname();
	const router = useRouter();

	return (
		<div className="flex w-1/5 flex-col items-center justify-start gap-2 rounded-lg bg-muted p-2 text-muted-foreground">
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

			<div className="w-full">
				<SignOutButton
					signOutCallback={() => {
						router.refresh();
					}}
				>
					<button className="w-full rounded-lg p-3 hover:bg-[#0a0a0a] hover:text-white">Đăng xuất</button>
				</SignOutButton>
			</div>

			<div className="h-full w-full text-center text-sm">
				<span className="block">Cần hỗ trợ? Vui lòng liên hệ: </span>

				<a href="mailto:phungtanphat23@gmail.com" className="text-blue-600">
					phungtanphat23@gmail.com
				</a>
			</div>
		</div>
	);
};

const TabItem = ({ href, currentPath, children }: { href: string; currentPath: string; children: ReactNode }) => {
	const isActive = currentPath == href;

	return (
		<button
			className={`w-full rounded-lg hover:bg-[#0a0a0a] hover:text-white ${
				isActive ? "dark:bg-[#0a0a0a] dark:text-white" : "bg-transparent"
			}`}
		>
			<Link href={href} className="block p-3">
				{children}
			</Link>
		</button>
	);
};
