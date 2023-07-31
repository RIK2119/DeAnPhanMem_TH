import { relations } from "drizzle-orm";
import { int, mysqlTable, text, timestamp, varchar } from "drizzle-orm/mysql-core";

import { BanTinTable } from "./banTin";
import { NguoiDungTable } from "./nguoiDung";

// Danh Gia
export const DanhGiaTable = mysqlTable("DanhGia", {
	maDanhGia: varchar("maDanhGia", { length: 36 }).primaryKey(),

	maNguoiDung: varchar("maNguoiDung", { length: 36 }),
	maBanTin: varchar("maBanTin", { length: 36 }),

	maTraLoi: varchar("maTraLoi", { length: 36 }),

	noiDung: text("noiDung").notNull(),
	ngayDanhGia: timestamp("ngayDanhGia", { mode: "date" }).defaultNow(),

	soLuotThich: int("soLuotThich").default(0),
});

export const DanhGia_Relations = relations(DanhGiaTable, ({ one, many }) => ({
	banTin: one(BanTinTable, {
		fields: [DanhGiaTable.maBanTin],
		references: [BanTinTable.maBanTin],
	}),

	nguoiDung: one(NguoiDungTable, {
		fields: [DanhGiaTable.maNguoiDung],
		references: [NguoiDungTable.maNguoiDung],
	}),

	traLoiCho: one(DanhGiaTable, {
		fields: [DanhGiaTable.maTraLoi],
		references: [DanhGiaTable.maDanhGia],
		relationName: "TraLoiDanhGia",
	}),

	traLoiBoi: many(DanhGiaTable, { relationName: "TraLoiDanhGia" }),
}));
