import { HeroMain } from "@/components/HomePage/Hero";
import { BanTinHot } from "@/components/HomePage/BanTinHot";

import { db } from "@/server/db/client";

import { desc } from "drizzle-orm";
import { Newspaper } from "lucide-react";
import { BanTinMoi } from "@/components/HomePage/BanTinMoi";
import { SideBar } from "@/components/HomePage/Sidebar";
import { Separator } from "@/components/ui/separator";

export default async function Home() {
	const [banTin, danhMuc] = await db.transaction(async (tx) => {
		const banTin = await tx.query.BanTinTable.findMany({
			with: { danhGia: true, danhMuc: true },
			limit: 3,
			orderBy: (banTin) => desc(banTin.luotXem),
		});

		const danhMuc = await tx.query.DanhMucTable.findMany({
			with: { banTin: true },
			limit: 3,
		});

		return [banTin, danhMuc] as const;
	});

	return (
		<>
			<HeroMain />

			<section className="container mx-auto flex h-max flex-col gap-y-5 py-5">
				<h2 className="flex gap-3">
					<Newspaper size={20} />
					Các bản tin <strong className="text-red-500"> HOT </strong>{" "}
				</h2>

				<div className="grid h-max grid-cols-3 items-center gap-5">
					{banTin.map((item) => (
						<BanTinHot key={item.maBanTin} item={item} />
					))}
				</div>
			</section>

			<section className="container mx-auto flex h-max flex-col gap-y-3 py-5">
				<div className="w-full">
					<p className="font-semibold">Bạn có thể quan tâm</p>
				</div>

				<div className="flex w-full border-t-[1px] border-t-black dark:border-t-gray-500/60">
					<div className="flex w-2/3 flex-col gap-y-5 border-r-[1px] border-r-black px-6 py-5 dark:border-r-gray-500/60">
						{banTin.map((bt, i) => {
							return (
								<>
									<BanTinMoi key={bt.maBanTin} banTin={bt} />
									{i < banTin.length - 1 && <Separator orientation="horizontal" className="dark:bg-gray-500/60" />}
								</>
							);
						})}
					</div>

					<div className="w-1/3 px-6 py-5">
						<SideBar danhMuc={danhMuc} />
					</div>
				</div>
			</section>
		</>
	);
}
