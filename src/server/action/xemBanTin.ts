"use server";

import { db } from "@/server/db/client";
import { BanTinDaXemTable } from "@/server/db/schema/banTinDaXem";
import { convertClerkUserIdToUUID } from "@/utils/clerk";

import type { InferModel } from "drizzle-orm";

export const danhDauDaXemBanTin = async ({ maBanTin, maNguoiDung }: { maBanTin: string; maNguoiDung?: string }) => {
	if (!maNguoiDung) throw new Error("Chưa Đăng Nhập");

	const banTin: InferModel<typeof BanTinDaXemTable, "insert"> = {
		maBanTin,
		maNguoiDung: convertClerkUserIdToUUID(maNguoiDung),
	};

	await db
		.insert(BanTinDaXemTable)
		.values(banTin)
		.onDuplicateKeyUpdate({ set: { maBanTin: banTin.maBanTin, maNguoiDung: banTin.maNguoiDung } });
};
