import { relations } from "drizzle-orm";
import { boolean, datetime, mysqlTable, text, timestamp, varchar } from "drizzle-orm/mysql-core";

import { DanhGiaTable } from "./danhGia";
import { YeuCauTable } from "./yeuCau";
import { BanTinDaLuuTable } from "./banTinDaLuu";
import { BanTinDaXemTable } from "./banTinDaXem";

// Nguoi dung
export const NguoiDungTable = mysqlTable("NguoiDung", {
	maNguoiDung: varchar("maNguoiDung", { length: 36 }).primaryKey(),

	email: varchar("email", { length: 255 }).unique(),
	tenNguoiDung: varchar("tenNguoiDung", { length: 100 }).notNull(),
	anhDaiDien: varchar("anhDaiDien", { length: 255 }),

	ngaySinh: datetime("ngaySinh").notNull(),
	soDT: varchar("soDT", { length: 11 }),

	diaChi: text("diaChi"),
	gioiTinh: boolean("gioiTinh").notNull(),

	ngayTaoTK: timestamp("ngayTaoTK", { mode: "date" }).defaultNow(),
	dKyDatBao: boolean("dKyDatBao").default(false),
});

export const NguoiDung_Relations = relations(NguoiDungTable, ({ many }) => ({
	yeuCau: many(YeuCauTable),
	danhGia: many(DanhGiaTable),

	banTinDaLuu: many(BanTinDaLuuTable),
	banTinDaXem: many(BanTinDaXemTable),
}));
