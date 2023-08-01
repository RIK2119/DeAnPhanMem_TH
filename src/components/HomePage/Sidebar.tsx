import Image from "next/image";
import Link from "next/link";

import type { BanTinTable } from "@/server/db/schema/banTin";
import type { DanhMucTable } from "@/server/db/schema/danhMuc";
import type { InferModel } from "drizzle-orm";

import { encodeBanTinPath } from "@/utils/path";
import { Card, CardDescription, CardHeader, CardTitle } from "@ui/card";

type ParamsType = {
	danhMuc: (InferModel<typeof DanhMucTable, "select"> & { banTin: InferModel<typeof BanTinTable, "select">[] | null })[];
};

export const SideBar = ({ danhMuc }: ParamsType) => {
	return (
		<aside className="flex flex-col gap-y-5">
			{danhMuc.map((item) => {
				if (!item.banTin || item.banTin.length === 0) return;

				return (
					<div key={item.maDanhMuc}>
						<h3 className="py-3 text-2xl font-bold">{item.tenDanhMuc}</h3>

						<div className="flex flex-col gap-y-3">
							{item.banTin.map((banTin) => {
								const banTinPath = encodeBanTinPath(banTin);

								return (
									<Link href={banTinPath} key={`${banTin.maBanTin}-${item.maDanhMuc}`}>
										<Card className="overflow-hidden">
											<div className="relative aspect-video w-full">
												<Image alt={banTin.tenBanTin} src={banTin.hinhNho} fill />
											</div>

											<CardHeader className="px-3 py-4">
												<CardTitle>{banTin.tenBanTin}</CardTitle>
												<CardDescription className="line-clamp-2">{banTin.noiDungTomTat}</CardDescription>
											</CardHeader>
										</Card>
									</Link>
								);
							})}
						</div>
					</div>
				);
			})}
		</aside>
	);
};
