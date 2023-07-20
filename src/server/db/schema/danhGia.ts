import { relations, sql } from "drizzle-orm";
import { int, mysqlTable, text, varchar } from "drizzle-orm/mysql-core";

import { BanTinTable } from "./banTin";
import { NguoiDungTable } from "./nguoiDung";

// Danh Gia
export const DanhGiaTable = mysqlTable("DanhGia", {
	maDanhGia: varchar("maDanhGia", { length: 36 }).primaryKey(),
	maNguoiDung: varchar("maNguoiDung", { length: 36 }),
	maBanTin: varchar("maBanTin", { length: 36 }),

	noiDung: text("noiDung").notNull(),
	soSao: int("soSao").notNull(),
});

export const DanhGia_Relations = relations(DanhGiaTable, ({ one }) => ({
	banTin: one(BanTinTable, {
		fields: [DanhGiaTable.maBanTin],
		references: [BanTinTable.maBanTin],
	}),

	nguoiDung: one(NguoiDungTable, {
		fields: [DanhGiaTable.maNguoiDung],
		references: [NguoiDungTable.maNguoiDung],
	}),
}));
