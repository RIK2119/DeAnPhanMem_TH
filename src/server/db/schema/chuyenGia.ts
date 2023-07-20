import { relations } from "drizzle-orm";
import { boolean, mysqlTable, varchar } from "drizzle-orm/mysql-core";

import { YeuCauTable } from "./yeuCau";

// ChuyenGia
export const ChuyenGiaTable = mysqlTable("ChuyenGia", {
	maChuyenGia: varchar("maChuyenGia", { length: 36 }).primaryKey(),
	tenChuyenGia: varchar("tenChuyenGia", { length: 100 }).notNull(),
	gioiTinh: boolean("gioiTinh").notNull(),

	hocVi: varchar("hocVi", { length: 20 }).notNull(),
	chuyenMon: varchar("chuyenMon", { length: 50 }).notNull(),
});

export const ChuyenGia_Relations = relations(ChuyenGiaTable, ({ many }) => ({
	yeuCau: many(YeuCauTable),
}));
