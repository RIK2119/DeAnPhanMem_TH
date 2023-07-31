import { AlertTriangle } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
	title: "404 - Trang không tồn tại",
};

export default function NotFoundPage() {
	return (
		<div className="mt-40 flex flex-col items-center">
			<h1 className="text-9xl font-bold">404</h1>

			<h2 className="mt-0 text-6xl font-medium">Page Not Found</h2>

			<div className="mt-8">
				<AlertTriangle />
			</div>

			<p className="mt-8 text-xl text-gray-500">
				The page you are looking for could not be found. Please go back to the homepage or contact us.
			</p>

			<Link href="/" className="mt-12 text-2xl text-blue-500">
				Go Back Home
			</Link>
		</div>
	);
}
