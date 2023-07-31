import { db } from "@/server/db/client";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

export const revalidate = 600;

const layData = async (tenDanhMuc: string) => {
	return db.query.DanhMucTable.findFirst({
		where: (table, { eq }) => eq(table.tenDanhMuc, decodeURIComponent(tenDanhMuc)),
	});
};

export const generateMetadata = async ({ params: { tenDanhMuc } }: { params: { tenDanhMuc: string } }): Promise<Metadata> => {
	const danhMuc = await layData(tenDanhMuc);

	if (!danhMuc) return { title: "Danh mục Không Tồn Tại" };

	return { title: danhMuc.tenDanhMuc + " - Bản Tin 24H - Nguồn Tin Tức Đa Dạng và Chính Xác" };
};

export default async function DanhMuc({ params: { tenDanhMuc } }: { params: { tenDanhMuc: string } }) {
	const danhMuc = await layData(tenDanhMuc);

	if (!danhMuc) notFound();

	return <div className="container mx-auto flex flex-col gap-4 py-24"></div>;
}
