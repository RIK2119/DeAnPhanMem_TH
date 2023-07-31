import "@/styles/globals.css";

import React from "react";

import { ClerkProvider, currentUser } from "@clerk/nextjs";
import { dark } from "@clerk/themes";

import type { Metadata } from "next";
import { Inter } from "next/font/google";

import { MainNavbar } from "@/components/Navbar/MainNavbar";
import { Toaster } from "@/components/Toaster";
import { BottomFooter } from "@/components/layout/BottomFooter";
import { MainLayout } from "@/components/layout/MainLayout";

const inter = Inter({ subsets: ["latin"], display: "swap", weight: "400" });

export const metadata: Metadata = {
	title: "Bản Tin 24H - Nguồn Tin Tức Đa Dạng và Chính Xác",
	description:
		"Bản Tin 24H là trang web tin tức mới nhất với nội dung đa dạng và phong phú về các sự kiện, tin tức xã hội, kinh doanh, công nghệ và nhiều lĩnh vực khác. Cung cấp thông tin tin tức chính xác, đáng tin cậy và nhanh chóng, Bản Tin 24H giúp bạn cập nhật những tin tức mới nhất trong và ngoài nước. Hãy khám phá và trải nghiệm ngay để không bỏ lỡ bất kỳ tin tức quan trọng nào.",
	authors: { name: "Asakuri", url: "https://github.com/Noki-Asakuri" },
	keywords: ["Bản Tin 24H", "tin tức", "sự kiện", "xã hội", "kinh doanh", "công nghệ", "nội dung đa dạng"],
	viewport: { initialScale: 1, maximumScale: 1 },
	icons: "/favicon.png",
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
	const user = await currentUser();
	const isDarkMode = true;

	return (
		// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
		<ClerkProvider appearance={{ baseTheme: isDarkMode ? dark : undefined }}>
			<html lang="en" className={isDarkMode ? "dark" : undefined}>
				<head />
				<body className={`${inter.className} flex min-h-screen flex-col dark:bg-neutral-900`}>
					<MainNavbar user={user} />
					<MainLayout>{children}</MainLayout>
					<BottomFooter />

					<Toaster />
				</body>
			</html>
		</ClerkProvider>
	);
}
