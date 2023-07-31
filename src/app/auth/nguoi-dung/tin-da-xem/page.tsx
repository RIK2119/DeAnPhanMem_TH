import { db } from "@/server/db/client";
import { ChiaSeDropdown } from "@/components/chiaSeDropdown";

import { Card, CardContent, CardHeader, CardTitle } from "@ui/card";
import { convertClerkUserIdToUUID } from "@/utils/clerk";
import { encodeBanTinPath } from "@/utils/path";

import { currentUser } from "@clerk/nextjs";

import { headers } from "next/headers";
import Image from "next/image";
import Link from "next/link";

import { BookMarked, MessagesSquare } from "lucide-react";
import { dayjs } from "@/utils/dayjs";

const layBanTinDaXem = async (maNguoiDung: string) => {
	return await db.query.BanTinDaXemTable.findMany({
		where: (table, { eq }) => eq(table.maNguoiDung, maNguoiDung),
		with: { banTin: { with: { danhGia: true, danhMuc: true } } },
		orderBy: (table, { desc }) => desc(table.ngayXem),
	});
};

export default async function UserProfilePage() {
	const user = await currentUser();
	if (!user) return <></>;

	const host = headers().get("host") as string;
	const data = await layBanTinDaXem(convertClerkUserIdToUUID(user.id));

	return (
		<Card className="flex h-full flex-col">
			<CardHeader>
				<CardTitle className="text-center text-2xl font-bold">Bản tin đã xem</CardTitle>
			</CardHeader>
			<CardContent>
				{data.length === 0 && (
					<div>
						<span>Bạn chưa đọc bản tin nào</span>
						<Link href="/" className="text-blue-500">
							Khám phá ngay!
						</Link>
					</div>
				)}

				<div className="flex flex-col items-center gap-y-4">
					{data.length > 0 &&
						data.map((d) => {
							const banTin = d.banTin!;

							const banTinPath = encodeBanTinPath(banTin);

							return (
								<div key={banTin.maBanTin} className="grid w-2/3 grid-cols-[160px_auto] gap-4">
									<div className="relative aspect-video w-40 overflow-hidden rounded-lg">
										<Link href={banTinPath}>
											<Image src={banTin.hinhNho} alt={banTin.tenBanTin} fill />
										</Link>
									</div>

									<div className="w-full">
										<Link href={banTinPath}>
											<h4>{banTin.tenBanTin}</h4>
										</Link>

										<div className="flex items-center justify-between text-sm">
											<div>
												<span className="text-gray-500 transition-colors hover:text-blue-500">
													<Link href={`/danhMuc/${banTin.danhMuc?.tenDanhMuc}`}>
														{banTin.danhMuc?.tenDanhMuc}
													</Link>
												</span>{" "}
												<span> - {dayjs(d.ngayXem).fromNow()} </span>
											</div>

											<div className="flex items-center justify-center gap-4">
												<div className="flex gap-2">
													<MessagesSquare size={20} /> {banTin.danhGia.length}
												</div>

												<ChiaSeDropdown host={host} tenBanTin={banTin.tenBanTin} duongDanBanTin={banTinPath} />

												<form className="flex items-center justify-center">
													<button type="submit">
														<BookMarked size={20} />
													</button>
												</form>
											</div>
										</div>
									</div>
								</div>
							);
						})}
				</div>
			</CardContent>
		</Card>
	);
}
