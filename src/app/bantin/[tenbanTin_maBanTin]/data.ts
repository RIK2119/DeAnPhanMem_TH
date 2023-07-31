import { cache } from "react";
import { isNull, not } from "drizzle-orm";

import { db } from "@/server/db/client";
import { convertClerkUserIdToUUID } from "@/utils/clerk";
import { decodeBanTinPath } from "@/utils/path";

export const layBanTin = cache(async (tenbanTin_maBanTin: string) => {
	const [, maBanTin] = decodeBanTinPath(tenbanTin_maBanTin);

	const banTin = await db.query.BanTinTable.findFirst({
		where: (banTin, { eq }) => eq(banTin.maBanTin, maBanTin),
		with: {
			danhGia: {
				where: (danhGia) => isNull(danhGia.maTraLoi),
				orderBy: (danhGia, { desc }) => desc(danhGia.ngayDanhGia),
				with: {
					nguoiDung: true,
					traLoiBoi: {
						orderBy: (traLoi, { desc }) => desc(traLoi.ngayDanhGia),
						with: { nguoiDung: true },
					},
				},
			},
			danhMuc: true,
			nhanvien: true,
		},
	});

	return banTin;
});

export const layBanTinXemNhieu = async (tenbanTin_maBanTin: string) => {
	const [, maBanTin] = decodeBanTinPath(tenbanTin_maBanTin);

	const banTinXemNhieu = await db.query.BanTinTable.findMany({
		where: (banTin, { eq }) => not(eq(banTin.maBanTin, maBanTin)),
		with: { danhGia: true },
		limit: 3,
		orderBy: (banTin, { desc }) => desc(banTin.luotXem),
	});

	return banTinXemNhieu;
};

export const checkDaLuuBanTin = async (tenbanTin_maBanTin: string, maNguoiDung?: string) => {
	if (!maNguoiDung) return false;
	const [, maBanTin] = decodeBanTinPath(tenbanTin_maBanTin);

	const daLuu = await db.query.BanTinDaLuuTable.findFirst({
		where: (table, { eq, and }) => and(eq(table.maBanTin, maBanTin), eq(table.maNguoiDung, convertClerkUserIdToUUID(maNguoiDung))),
	});

	console.log(!!daLuu);

	return !!daLuu;
};
