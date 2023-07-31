import { relations } from "drizzle-orm";
import { mysqlTable, primaryKey, timestamp, varchar } from "drizzle-orm/mysql-core";

import { BanTinTable } from "./banTin";
import { NguoiDungTable } from "./nguoiDung";

export const BanTinDaLuuTable = mysqlTable(
	"BanTinDaLuu",
	{
		maBanTin: varchar("maBanTin", { length: 36 }),
		maNguoiDung: varchar("maNguoiDung", { length: 36 }),

		ngayLuu: timestamp("ngayDang", { mode: "date" }).defaultNow(),
	},
	(table) => ({
		pk: primaryKey(table.maBanTin, table.maNguoiDung),
	}),
);

export const BanTinDaLuu_Relations = relations(BanTinDaLuuTable, ({ one }) => ({
	nguoiDung: one(NguoiDungTable, {
		fields: [BanTinDaLuuTable.maNguoiDung],
		references: [NguoiDungTable.maNguoiDung],
	}),
	banTin: one(BanTinTable, {
		fields: [BanTinDaLuuTable.maBanTin],
		references: [BanTinTable.maBanTin],
	}),
}));
