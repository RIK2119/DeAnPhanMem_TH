import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { cache } from "react";
import ReactMarkdown from "react-markdown";

import { isNull, not } from "drizzle-orm";

import { DanhGiaBanTin } from "@/components/ban-tin/DanhGia";
import { ThanhCongCu } from "@/components/ban-tin/thanhCongCu";
import { Separator } from "@/components/ui/separator";

import { db } from "@/server/db/client";
import { convertClerkUserIdToUUID } from "@/utils/clerk";
import { decodeBanTinPath, encodeBanTinPath } from "@/utils/path";

import { currentUser } from "@clerk/nextjs";
import { headers } from "next/headers";

const layBanTin = cache(async (tenbanTin_maBanTin: string) => {
	const [, maBanTin] = decodeBanTinPath(tenbanTin_maBanTin);

	const banTin = await db.query.BanTinTable.findFirst({
		where: (banTin, { eq }) => eq(banTin.maBanTin, maBanTin),
		with: {
			danhGia: {
				where: (danhGia) => isNull(danhGia.maTraLoi),
				orderBy: (danhGia, { desc }) => desc(danhGia.ngayDanhGia),
				with: {
					nguoiDung: true,
					traLoiBoi: {
						orderBy: (traLoi, { desc }) => desc(traLoi.ngayDanhGia),
						with: { nguoiDung: true },
					},
				},
			},
			danhMuc: true,
			nhanvien: true,
		},
	});

	return banTin;
});

const layBanTinXemNhieu = async (tenbanTin_maBanTin: string) => {
	const [, maBanTin] = decodeBanTinPath(tenbanTin_maBanTin);

	const banTinXemNhieu = await db.query.BanTinTable.findMany({
		where: (banTin, { eq }) => not(eq(banTin.maBanTin, maBanTin)),
		with: { danhGia: true },
		limit: 3,
		orderBy: (banTin, { desc }) => desc(banTin.luotXem),
	});

	return banTinXemNhieu;
};

const checkDaLuuBanTin = async (tenbanTin_maBanTin: string, maNguoiDung?: string) => {
	if (!maNguoiDung) return false;
	const [, maBanTin] = decodeBanTinPath(tenbanTin_maBanTin);

	const daLuu = await db.query.BanTinDaLuuTable.findFirst({
		where: (table, { eq, and }) => and(eq(table.maBanTin, maBanTin), eq(table.maNguoiDung, convertClerkUserIdToUUID(maNguoiDung))),
	});

	console.log(!!daLuu);

	return !!daLuu;
};

type Params = { params: { tenbanTin_maBanTin: string } };

export const revalidate = 600;
export const generateMetadata = async ({ params: { tenbanTin_maBanTin } }: Params): Promise<Metadata> => {
	const banTin = await layBanTin(tenbanTin_maBanTin);

	if (!banTin) return { title: "Bản Tin Không Tồn Tại" };

	return {
		title: banTin.tenBanTin,
		description: banTin.noiDungTomTat,
	};
};

export default async function BanTinPage({ params: { tenbanTin_maBanTin } }: Params) {
	const user = await currentUser();
	const [banTin, banTinXemNhieu, isLuuBanTin] = await Promise.all([
		layBanTin(tenbanTin_maBanTin),
		layBanTinXemNhieu(tenbanTin_maBanTin),
		checkDaLuuBanTin(tenbanTin_maBanTin, user?.id),
	]);

	const host = headers().get("host");

	const dateFormatter = new Intl.DateTimeFormat("vi", { dateStyle: "full" });
	const timeFormatter = new Intl.DateTimeFormat("vi", { timeStyle: "long" });

	if (!banTin) notFound();

	return (
		<div className="container mx-auto flex flex-col gap-4 py-24">
			<div className="flex gap-4">
				<section className="w-2/3">
					<div className="flex items-center justify-between">
						<div>
							<Link href={`/danhMuc/${banTin.danhMuc?.tenDanhMuc}`} className="text-blue-600 hover:text-blue-400">
								{banTin.danhMuc?.tenDanhMuc}
							</Link>
						</div>

						<div className="pr-4">
							{dateFormatter.format(banTin.ngayDang!)}, lúc {timeFormatter.format(banTin.ngayDang!)}
						</div>
					</div>

					<div className="rounded-br-lg border-b-[1px] border-r-[1px] border-[#262626]/60 pr-4">
						<h1 className="py-5 text-3xl font-bold"> {banTin.tenBanTin} </h1>
						<ReactMarkdown
							className="[&>p]:pb-5"
							components={{
								// eslint-disable-next-line @typescript-eslint/no-unused-vars
								img: ({ node, alt, src, ...prop }) => (
									<span className="flex flex-col gap-y-2">
										{/* eslint-disable-next-line @next/next/no-img-element */}
										<img src={src as string} alt={alt as string} {...prop} className="w-full rounded-lg" />
										<span className="text-sm text-gray-600 dark:text-gray-300">{alt}</span>
									</span>
								),
							}}
						>
							{banTin.noiDung}
						</ReactMarkdown>
					</div>

					<div className="flex items-center justify-end pr-4 pt-5">
						<span className="text-xl font-bold">{banTin.nhanvien?.tenNhanVien}</span>
					</div>

					<ThanhCongCu banTin={banTin} host={host as string} user={user} daLuu={isLuuBanTin} />

					{/* @ts-expect-error Type không đồng đều nhưng kết quả vẫn đúng */}
					<DanhGiaBanTin banTin={banTin} user={user} />
				</section>

				<section className="h-max w-1/3 py-3">
					<h4 className="pb-3 text-xl font-bold"> Xem nhiều </h4>

					<div className="flex flex-col gap-y-3">
						{banTinXemNhieu.map((banTin, i) => {
							const banTinPath = encodeBanTinPath(banTin);

							return (
								<>
									<Link href={banTinPath} key={banTin.maBanTin}>
										<div className="grid grid-cols-[110px_1fr] gap-2">
											<div className="relative aspect-video w-full">
												<Image src={banTin.hinhNho} alt={banTin.tenBanTin} fill className="rounded-lg" />
											</div>
											<div className="self-center text-sm">
												<span>{banTin.tenBanTin}</span>
											</div>
										</div>
									</Link>

									{i < banTinXemNhieu.length - 1 && (
										<Separator orientation="horizontal" className="dark:bg-gray-500/60" />
									)}
								</>
							);
						})}
					</div>
				</section>
			</div>
		</div>
	);
}
