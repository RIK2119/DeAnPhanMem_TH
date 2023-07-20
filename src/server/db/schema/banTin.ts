import { relations } from "drizzle-orm";
import { int, mysqlEnum, mysqlTable, text, timestamp, varchar } from "drizzle-orm/mysql-core";

import { DanhGiaTable } from "./danhGia";
import { DanhMucTable } from "./danhMuc";
import { NhanVienTable } from "./nhanVien";

export const BanTinTable = mysqlTable("BanTin", {
	maBanTin: varchar("maBanTin", { length: 36 }).primaryKey(),
	maDanhMuc: varchar("maDanhMuc", { length: 36 }),
	maNhanVien: varchar("maNhanVien", { length: 36 }),

	tenBanTin: varchar("tenBanTin", { length: 255 }).notNull(),
	noiDungTomTat: varchar("tomGon", { length: 255 }).notNull(),
	noiDung: text("noiDung").notNull(),

	hinhNho: text("thumbnail").notNull(),
	trangThai: mysqlEnum("trangThai", ["Chờ Duyệt", "Đã duyệt"]).default("Chờ Duyệt"),

	ngayDang: timestamp("ngayDang", { mode: "date" }).defaultNow(),

	luotXem: int("luotXem").default(0),
	luotChiaSe: int("luotChiaSe").default(0),
	luotYeuThich: int("luotYeuThich").default(0),
});

export const BanTin_Relations = relations(BanTinTable, ({ one, many }) => ({
	danhMuc: one(DanhMucTable, {
		fields: [BanTinTable.maDanhMuc],
		references: [DanhMucTable.maDanhMuc],
	}),
	nhanvien: one(NhanVienTable, {
		fields: [BanTinTable.maNhanVien],
		references: [NhanVienTable.maNhanVien],
	}),
	danhGia: many(DanhGiaTable),
}));
