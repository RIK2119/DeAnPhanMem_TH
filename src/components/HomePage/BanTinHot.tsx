"use client";

import Link from "next/link";

import { encodeBanTinPath } from "@/utils/path";
import { dayjs } from "@/utils/dayjs";

import { Card, CardFooter, Divider, Image, Chip, Button } from "@nextui-org/react";
import { type getBanTinHot } from "./data";
import { Eye, Heart, MessagesSquare } from "lucide-react";

type ParamsType = {
	banTin: Awaited<ReturnType<typeof getBanTinHot>>[number];
};

export const BanTinHot = ({ banTin }: ParamsType) => {
	const banTinPath = encodeBanTinPath(banTin);

	return (
		<div className="relative">
			<Chip classNames={{ base: "absolute left-2 top-2 z-20", content: "flex items-center gap-1" }}>
				<Eye size={20} /> {banTin.luoiXem}
			</Chip>

			<Button isIconOnly size="sm" startContent={<Heart size={20} />} className="absolute right-2 top-2 z-20" />
			<Card
				as={Link}
				href={banTinPath}
				isHoverable
				isPressable
				className="h-full shadow-[4px_4px_10px_1px_rgba(0,0,0,0.25)] shadow-default-400/60"
			>
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

					<Chip classNames={{ base: "max-w-full w-full", content: "grid w-full grid-cols-3 gap-3 place-items-center" }}>
						<span>{banTin.DanhMuc.TenDanhMuc}</span>
						<span>{dayjs(banTin.NgayDang).fromNow()}</span>
						<div className="flex gap-2">
							<MessagesSquare size={20} /> {banTin.DanhGia.length}
						</div>
					</Chip>
				</CardFooter>
			</Card>
		</div>
	);
};
