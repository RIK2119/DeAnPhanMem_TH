import { relations } from "drizzle-orm";
import { datetime, mysqlTable, varchar } from "drizzle-orm/mysql-core";

import { ChuyenGiaTable } from "./chuyenGia";
import { NguoiDungTable } from "./nguoiDung";

// Yeu cau
export const YeuCauTable = mysqlTable("YeuCau", {
	maYeuCau: varchar("maYeuCau", { length: 36 }).primaryKey(),
	maNguoiDung: varchar("maNguoiDung", { length: 36 }),
	maChuyenGia: varchar("maChuyenGia", { length: 36 }),

	chuDe: varchar("chuDe", { length: 30 }).notNull(),
	trangThai: varchar("trangThai", { length: 20 }).notNull(),

	thoiGian: datetime("thoiGian").notNull(),
});

export const YeuCau_Relations = relations(YeuCauTable, ({ one }) => ({
	nguoiDung: one(NguoiDungTable, {
		fields: [YeuCauTable.maNguoiDung],
		references: [NguoiDungTable.maNguoiDung],
	}),
	chuyenGia: one(ChuyenGiaTable, {
		fields: [YeuCauTable.maChuyenGia],
		references: [ChuyenGiaTable.maChuyenGia],
	}),
}));
