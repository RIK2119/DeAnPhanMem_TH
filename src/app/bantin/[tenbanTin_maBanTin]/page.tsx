import { db } from "@/server/db/client";
import { decodeBanTinPath } from "@/utils/path";

export default async function BanTinPage({ params: { tenbanTin_maBanTin } }: { params: { tenbanTin_maBanTin: string } }) {
	const [tenBanTin, maBanTin] = decodeBanTinPath(tenbanTin_maBanTin);

	const banTin = await db.query.BanTinTable.findFirst({
		where: (banTin, { eq, and }) => and(eq(banTin.tenBanTin, tenBanTin), eq(banTin.maBanTin, maBanTin)),
	});

	if (!banTin) {
		return <div className="flex h-screen w-full items-center justify-center">Not found</div>;
	}

	return <pre>{JSON.stringify(banTin, null, 4)}</pre>;
}
