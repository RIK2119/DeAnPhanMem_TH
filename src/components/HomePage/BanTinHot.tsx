"use client";

import Image from "next/image";
import Link from "next/link";

import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

import type { BanTinTable } from "@/server/db/schema/banTin";
import type { DanhGiaTable } from "@/server/db/schema/danhGia";
import type { DanhMucTable } from "@/server/db/schema/danhMuc";

import { dayjs } from "@/utils/dayjs";

import { encodeBanTinPath } from "@/utils/path";
import type { InferModel } from "drizzle-orm";
import { MessageCircle } from "lucide-react";

type ParamsType = {
	item: InferModel<typeof BanTinTable, "select"> & {
		danhMuc: InferModel<typeof DanhMucTable, "select"> | null;
		danhGia: InferModel<typeof DanhGiaTable, "select">[] | null;
	};
};

const BanTinHot = ({ item }: ParamsType) => {
	const banTinPath = encodeBanTinPath(item);

	return (
		<Link href={banTinPath} className="h-full overflow-hidden rounded-xl shadow-[4px_4px_10px_1px_rgba(0,0,0,0.25)]">
			<Card className="grid h-full grid-cols-1 grid-rows-[208px_1fr] rounded-none border-none shadow-none">
				<div className="relative h-full w-full border-b-[1px] border-b-gray-400">
					<Image alt={item.tenBanTin} src={item.hinhNho} fill />
				</div>
				<div className="grid grid-rows-[1fr_max-content] gap-3 px-6 py-3">
					<CardHeader className="p-0">
						<CardTitle className="text-left">{item.tenBanTin}</CardTitle>
						<CardDescription className="line-clamp-2">{item.noiDungTomTat}</CardDescription>
					</CardHeader>
					<CardFooter className="flex items-center justify-between p-0">
						<div className="text-sm">{dayjs(item.ngayDang).fromNow()}</div>

						<div>{item.danhMuc?.tenDanhMuc}</div>

						<div className="flex items-center gap-1.5">
							<MessageCircle size={20} />
							<span>{item.danhGia?.length ?? 0}</span>
						</div>
					</CardFooter>
				</div>
			</Card>
		</Link>
	);
};

export { BanTinHot };
