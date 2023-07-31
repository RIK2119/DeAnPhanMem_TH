"use server";

import { db } from "@/server/db/client";
import { BanTinDaXemTable } from "@/server/db/schema/banTinDaXem";
import { convertClerkUserIdToUUID } from "@/utils/clerk";

import { eq, type InferModel } from "drizzle-orm";
import { BanTinTable } from "../db/schema/banTin";

export const danhDauDaXemBanTin = async ({
	maBanTin,
	maNguoiDung,
	luoiXem,
}: {
	maBanTin: string;
	maNguoiDung?: string;
	luoiXem: number;
}) => {
	if (!maNguoiDung) throw new Error("Chưa Đăng Nhập");

	const banTin: InferModel<typeof BanTinDaXemTable, "insert"> = {
		maBanTin,
		maNguoiDung: convertClerkUserIdToUUID(maNguoiDung),
	};

	await db
		.insert(BanTinDaXemTable)
		.values(banTin)
		.onDuplicateKeyUpdate({ set: { maBanTin: banTin.maBanTin, maNguoiDung: banTin.maNguoiDung } });

	await db
		.update(BanTinTable)
		.set({ luotXem: luoiXem + 1 })
		.where(eq(BanTinTable.maBanTin, maBanTin));
};
