import { relations, sql } from "drizzle-orm";
import { mysqlTable, text, varchar } from "drizzle-orm/mysql-core";

import { BanTinTable } from "./banTin";

// Danh muc
export const DanhMucTable = mysqlTable("DanhMuc", {
	maDanhMuc: varchar("maDanhMuc", { length: 36 }).primaryKey(),
	tenDanhMuc: varchar("tenDanhMuc", { length: 255 }).notNull().unique(),
	moTa: text("moTa").notNull(),
});

export const DanhMuc_Relations = relations(DanhMucTable, ({ many }) => ({
	BanTin: many(BanTinTable),
}));
