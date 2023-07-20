import { relations } from "drizzle-orm";
import { boolean, datetime, mysqlTable, text, timestamp, varchar } from "drizzle-orm/mysql-core";

import { DanhGiaTable } from "./danhGia";
import { YeuCauTable } from "./yeuCau";

// Nguoi dung
export const NguoiDungTable = mysqlTable("NguoiDung", {
	maNguoiDung: varchar("maNguoiDung", { length: 36 }).primaryKey(),
	matKhauMaHoa: text("matKhauMaHoa").notNull(),
	tenNguoiDung: varchar("tenNguoiDung", { length: 100 }).notNull(),

	ngaySinh: datetime("ngaySinh").notNull(),
	soDT: varchar("soDT", { length: 11 }),
	email: varchar("email", { length: 255 }).unique(),

	diaChi: text("diaChi"),
	gioiTinh: boolean("gioiTinh").notNull(),

	ngayTaoTK: timestamp("ngayTaoTK", { mode: "date" }).defaultNow(),
	dKyDatBao: boolean("dKyDatBao").default(false),
});

export const NguoiDung_Relations = relations(NguoiDungTable, ({ many }) => ({
	yeuCau: many(YeuCauTable),
	danhGia: many(DanhGiaTable),
}));
