"use client";

import { Card, CardFooter, Chip, Divider, Image } from "@nextui-org/react";

import { encodeBanTinPath } from "@/utils/path";
import { dayjs } from "@/utils/dayjs";

import Link from "next/link";
import type { getDanhMuc } from "./data";
import { MessagesSquare } from "lucide-react";

type ParamsType = {
	danhMuc: Awaited<ReturnType<typeof getDanhMuc>>;
};

export const SideBar = ({ danhMuc }: ParamsType) => {
	return (
		<aside className="flex flex-col gap-y-5">
			{danhMuc.map((item) => {
				if (item.BanTin.length === 0) return;

				return (
					<div key={item.MaDanhMuc}>
						<h3 className="pb-3 text-2xl font-semibold">{item.TenDanhMuc}</h3>

						<div className="flex flex-col gap-y-3">
							{item.BanTin.map((banTin) => {
								const banTinPath = encodeBanTinPath(banTin);

								return (
									<Card isPressable as={Link} href={banTinPath} key={`${banTin.MaBanTin}-${item.MaDanhMuc}`}>
										<Image
											removeWrapper
											className="aspect-video rounded-b-none object-cover"
											alt={banTin.NoiDungTomTat}
											src={banTin.PreviewImage}
										/>

										<CardFooter className="flex-col justify-between gap-2 border-t-1 border-zinc-100/50">
											<h2 className="flex h-12 items-center text-center font-semibold">{banTin.TenBanTin}</h2>
											<p className="line-clamp-2">{banTin.NoiDungTomTat}</p>

											<Divider orientation="horizontal" />

											<Chip
												classNames={{
													base: "max-w-full w-full",
													content: "grid w-full grid-cols-3 gap-3 place-items-center",
												}}
											>
												<span>{item.TenDanhMuc}</span>
												<span>{dayjs(banTin.NgayDang).fromNow()}</span>
												<div className="flex gap-2">
													<MessagesSquare size={20} /> {banTin.DanhGia.length}
												</div>
											</Chip>
										</CardFooter>
									</Card>
								);
							})}
						</div>
					</div>
				);
			})}
		</aside>
	);
};
