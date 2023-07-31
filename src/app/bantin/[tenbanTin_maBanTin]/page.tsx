import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import ReactMarkdown from "react-markdown";

import { DanhGiaBanTin } from "@/components/ban-tin/DanhGia";
import { ThanhCongCu } from "@/components/ban-tin/thanhCongCu";
import { Separator } from "@/components/ui/separator";
import { DanhDauDaXemBanTin } from "@/components/ban-tin/DanhDauDaXemBanTin";

import { encodeBanTinPath } from "@/utils/path";

import { currentUser } from "@clerk/nextjs";
import { headers } from "next/headers";
import { checkDaLuuBanTin, layBanTin, layBanTinXemNhieu } from "./data";

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
		<>
			{user && <DanhDauDaXemBanTin user={user} banTin={banTin} />}
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
		</>
	);
}
