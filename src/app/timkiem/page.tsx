import { db } from "@/server/db/client";
import { encodeBanTinPath } from "@/utils/path";
import { like } from "drizzle-orm";
import { MessagesSquare } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default async function TimKiemPage({ searchParams: { query } }: { searchParams: { query: string | undefined } }) {
	if (!query) return;

	const ketQua = await db.query.BanTinTable.findMany({
		where: (table) => like(table.tenBanTin, `%${query}%`),
		orderBy: (table, { desc }) => desc(table.ngayDang),
		with: { danhGia: true },
	});

	if (!ketQua || ketQua.length === 0) {
		return (
			<div className="container mx-auto flex flex-1 flex-col items-center justify-center gap-4 py-24">
				<h3 className="text-3xl font-bold"> Không có bản tin nào </h3>
			</div>
		);
	}

	return (
		<div className="container mx-auto flex flex-col gap-4 py-24">
			<h3 className="text-3xl font-bold"> Kết quả tìm kiếm ({ketQua.length}) </h3>

			<div className="flex flex-col gap-y-5">
				{ketQua.map((banTin) => {
					const banTinPath = encodeBanTinPath(banTin);

					// return <div key={`${banTin.maBanTin}-${query}`}>{banTin.tenBanTin}</div>;
					return (
						<div key={`${banTin.maBanTin}-${query}`} className="grid grid-cols-[240px_auto] gap-4">
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
		</div>
	);
}
