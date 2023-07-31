import { relations } from "drizzle-orm";
import { mysqlTable, primaryKey, timestamp, varchar } from "drizzle-orm/mysql-core";

import { BanTinTable } from "./banTin";
import { NguoiDungTable } from "./nguoiDung";

export const BanTinDaXemTable = mysqlTable(
	"BanTinDaXem",
	{
		maBanTin: varchar("maBanTin", { length: 36 }),
		maNguoiDung: varchar("maNguoiDung", { length: 36 }),

		ngayXem: timestamp("ngayDang", { mode: "date" }).defaultNow(),
	},
	(table) => ({
		pk: primaryKey(table.maBanTin, table.maNguoiDung),
	}),
);

export const BanTinDaXem_Relations = relations(BanTinDaXemTable, ({ one }) => ({
	nguoiDung: one(NguoiDungTable, {
		fields: [BanTinDaXemTable.maNguoiDung],
		references: [NguoiDungTable.maNguoiDung],
	}),
	banTin: one(BanTinTable, {
		fields: [BanTinDaXemTable.maBanTin],
		references: [BanTinTable.maBanTin],
	}),
}));
