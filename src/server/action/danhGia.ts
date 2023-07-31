"use server";

import { db } from "@/server/db/client";
import { DanhGiaTable } from "@/server/db/schema/danhGia";
import { convertClerkUserIdToUUID } from "@/utils/clerk";

import type { InferModel } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { v4 } from "uuid";

export const danhGiaBanTin = async ({
	data,
	maBanTin,
	maNguoiDung,
	url,
}: {
	data: FormData;
	maBanTin: string;
	maNguoiDung?: string;
	url: string;
}) => {
	if (!maNguoiDung) throw new Error("Chưa Đăng Nhập");

	const noiDung = data.get("noiDungDanhGia")?.toString() || "";
	const danhGia: InferModel<typeof DanhGiaTable, "insert"> = {
		maDanhGia: v4(),
		noiDung: noiDung?.toString(),
		maBanTin,
		maNguoiDung: convertClerkUserIdToUUID(maNguoiDung),
	};

	await db.insert(DanhGiaTable).values(danhGia);
	revalidatePath(url);
};

export const traLoiDanhGia = async ({
	data,
	maBanTin,
	maNguoiDung,
	maDanhGia,
	url,
}: {
	data: FormData;
	maBanTin: string;
	maNguoiDung?: string;
	maDanhGia: string;
	url: string;
}) => {
	if (!maNguoiDung) throw new Error("Chưa Đăng Nhập");

	const noiDung = data.get("noiDungDanhGia")?.toString() || "";
	const danhGia: InferModel<typeof DanhGiaTable, "insert"> = {
		maNguoiDung: convertClerkUserIdToUUID(maNguoiDung),
		noiDung: noiDung?.toString(),
		maTraLoi: maDanhGia,
		maDanhGia: v4(),
		maBanTin,
	};

	await db.insert(DanhGiaTable).values(danhGia);
	revalidatePath(url);
};
