"use server";

import { db } from "@/server/db/client";
import { BanTinDaLuuTable } from "@/server/db/schema/banTinDaLuu";
import { convertClerkUserIdToUUID } from "@/utils/clerk";

import type { InferModel } from "drizzle-orm";

export const luuBanTin = async ({ maBanTin, maNguoiDung }: { maBanTin: string; maNguoiDung?: string }) => {
	if (!maNguoiDung) throw new Error("Chưa Đăng Nhập");

	const banTin: InferModel<typeof BanTinDaLuuTable, "insert"> = {
		maBanTin,
		maNguoiDung: convertClerkUserIdToUUID(maNguoiDung),
	};

	await db.insert(BanTinDaLuuTable).values(banTin);
};
