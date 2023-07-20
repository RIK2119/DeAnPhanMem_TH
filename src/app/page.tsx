import { HeroMain } from "@/components/HomePage/Hero";
import { BanTinHot } from "@/components/HomePage/BanTinHot";

import { db } from "@/server/db/client";

import { desc } from "drizzle-orm";
import { Newspaper } from "lucide-react";
import { BanTinMoi } from "@/components/HomePage/BanTinMoi";

export default async function Home() {
	const data = await db.query.BanTinTable.findMany({
		with: { danhGia: true, danhMuc: true },
		limit: 3,
		orderBy: (banTin) => desc(banTin.luotXem),
	});

	return (
		<>
			<HeroMain />

			<section className="mx-auto flex h-max max-w-6xl flex-col gap-y-5 py-5">
				<h2 className="flex gap-3">
					<Newspaper size={20} />
					Các bản tin <strong className="text-red-500"> HOT </strong>{" "}
				</h2>

				<div className="grid h-max grid-cols-3 items-center gap-5">
					{data.map((item) => (
						<BanTinHot key={item.maBanTin} item={item} />
					))}
				</div>
			</section>

			<section className="mx-auto flex h-max max-w-6xl flex-col gap-y-3 py-5">
				<div className="w-full">
					<p className="font-semibold">Bạn có thể quan tâm</p>
				</div>

				<div className="w-full border-t-[1px] border-t-black">
					<div className="flex w-2/3 flex-col gap-y-10 border-r-[1px] border-r-black px-6 py-5">
						{data.map((banTin) => (
							<BanTinMoi key={banTin.maBanTin} banTin={banTin} />
						))}
					</div>

					<div className="w-1/3"></div>
				</div>
			</section>
		</>
	);
}
