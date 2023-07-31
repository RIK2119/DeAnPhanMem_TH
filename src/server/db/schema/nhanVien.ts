import { relations } from "drizzle-orm";
import { datetime, decimal, mysqlTable, text, varchar } from "drizzle-orm/mysql-core";

import { BanTinTable } from "./banTin";

// Nhan Vien
export const NhanVienTable = mysqlTable("NhanVien", {
	maNhanVien: varchar("maNhanVien", { length: 36 }).primaryKey(),
	tenNhanVien: varchar("tenNhanVien", { length: 100 }).notNull(),

	chucVu: varchar("chucVu", { length: 15 }).notNull(),
	luong: decimal("luong", { precision: 10, scale: 3 }).notNull(),

	diaChi: text("diaChi"),
	soDT: varchar("soDT", { length: 11 }).notNull(),

	phongBan: varchar("phongBan", { length: 20 }).notNull(),
	caLamViec: varchar("caLamViec", { length: 32 }).notNull(),

	ngaySinh: datetime("ngaySinh").notNull(),
	ngayVaoLam: datetime("ngayVaoLam").notNull(),
});

export const NhanVien_Relations = relations(NhanVienTable, ({ many }) => ({
	banTin: many(BanTinTable),
}));
