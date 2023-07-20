import "@/styles/globals.css";

import React from "react";

import { ClerkProvider, auth } from "@clerk/nextjs";
import { dark } from "@clerk/themes";

import type { Metadata } from "next";
import { Inter } from "next/font/google";

import { MainNavbar } from "@/components/Navbar/MainNavbar";
import { Toaster } from "@/components/Toaster";

const inter = Inter({ subsets: ["latin"], display: "swap", weight: "400" });

export const metadata: Metadata = {
	title: "Bản Tin 24H - Nguồn Tin Tức Đa Dạng và Chính Xác",
	description:
		"Bản Tin 24H là trang web tin tức mới nhất với nội dung đa dạng và phong phú về các sự kiện, tin tức xã hội, kinh doanh, công nghệ và nhiều lĩnh vực khác. Cung cấp thông tin tin tức chính xác, đáng tin cậy và nhanh chóng, Bản Tin 24H giúp bạn cập nhật những tin tức mới nhất trong và ngoài nước. Hãy khám phá và trải nghiệm ngay để không bỏ lỡ bất kỳ tin tức quan trọng nào.",
	authors: { name: "Asakuri", url: "https://github.com/Noki-Asakuri" },
	keywords: ["Bản Tin 24H", "tin tức", "sự kiện", "xã hội", "kinh doanh", "công nghệ", "nội dung đa dạng"],
	viewport: { initialScale: 1, maximumScale: 1 },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	const { userId } = auth();

	const isDarkMode = true;

	return (
		// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
		<ClerkProvider appearance={{ baseTheme: isDarkMode && dark }}>
			<html lang="en" className={isDarkMode && "dark"}>
				<head />
				<body className={inter.className}>
					<MainNavbar userId={userId} />
					<main className="min-h-screen min-w-full dark:bg-neutral-900">{children}</main>

					<Toaster />
				</body>
			</html>
		</ClerkProvider>
	);
}
