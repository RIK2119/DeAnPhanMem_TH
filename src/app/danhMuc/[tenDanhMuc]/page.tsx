import { Trang } from "@/components/Pagination";
import { db } from "@/server/db/client";
import { encodeBanTinPath } from "@/utils/path";
import { MessagesSquare } from "lucide-react";

import type { Metadata } from "next";

import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

export const revalidate = 600;

const layData = async (tenDanhMuc: string) => {
	return db.query.DanhMucTable.findFirst({
		where: (table, { eq }) => eq(table.tenDanhMuc, decodeURIComponent(tenDanhMuc)),
		with: { banTin: true },
	});
};

const layDanhSachBanTin = async (maDanhMuc: string, page: number) => {
	return db.query.BanTinTable.findMany({
		where: (table, { eq }) => eq(table.maDanhMuc, maDanhMuc),
		limit: 8,
		offset: page * 8,
		with: { danhGia: true },
		orderBy: (table, { desc }) => desc(table.ngayDang),
	});
};

export const generateMetadata = async ({ params: { tenDanhMuc } }: { params: { tenDanhMuc: string } }): Promise<Metadata> => {
	const danhMuc = await layData(tenDanhMuc);
	if (!danhMuc) return { title: "Danh mục Không Tồn Tại" };

	return { title: danhMuc.tenDanhMuc + " - Bản Tin 24H - Nguồn Tin Tức Đa Dạng và Chính Xác" };
};

function getTotalPages(totalItems: number, perPage: number) {
	return Math.ceil(totalItems / perPage);
}

export default async function DanhMuc({
	params: { tenDanhMuc },
	searchParams: { page },
}: {
	params: { tenDanhMuc: string };
	searchParams: { page: string | undefined };
}) {
	const danhMuc = await layData(tenDanhMuc);
	if (!danhMuc) notFound();

	const totalPages = getTotalPages(danhMuc.banTin.length, 8) - 1;
	const banTin = await layDanhSachBanTin(danhMuc.maDanhMuc, parseInt(page || "1"));

	return (
		<div className="container mx-auto flex flex-col gap-4 py-24">
			<h3 className="text-2xl font-bold">{danhMuc.tenDanhMuc}</h3>

			<div className="flex w-2/3 flex-col gap-y-5">
				{banTin &&
					banTin.map((banTin) => {
						const banTinPath = encodeBanTinPath(banTin);

						return (
							<div key={`${banTin.maBanTin}-${banTin.maDanhMuc}`} className="grid grid-cols-[240px_auto] gap-4">
								<div className="relative aspect-video w-full overflow-hidden rounded-lg">
									<Link href={banTinPath}>
										<Image src={banTin.hinhNho} alt={banTin.tenBanTin} fill />
									</Link>
								</div>

								<div>
									<h4 className="text-lg font-bold">
										<Link href={banTinPath}>{banTin.tenBanTin}</Link>
									</h4>
									<p>
										<Link href={banTinPath}>{banTin.noiDungTomTat}</Link>

										<div className="inline-flex w-max items-center justify-center gap-2 pl-2">
											<MessagesSquare size={16} />
											<span className="text-blue-500/50">{banTin.danhGia.length}</span>
										</div>
									</p>
								</div>
							</div>
						);
					})}
			</div>

			<div className="flex items-center justify-center">
				<Trang totalPages={totalPages} currentPage={parseInt(page || "0")} />
			</div>
		</div>
	);
}
