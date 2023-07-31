import { drizzle } from "drizzle-orm/planetscale-serverless";
import { connect } from "@planetscale/database";

import * as BanTin from "./schema/banTin";
import * as chuyenGia from "./schema/chuyenGia";
import * as danhGia from "./schema/danhGia";
import * as danhMuc from "./schema/danhMuc";
import * as nguoiDung from "./schema/nguoiDung";
import * as nhanVien from "./schema/nhanVien";
import * as yeuCau from "./schema/yeuCau";
import * as banTinDaLuu from "./schema/banTinDaLuu";
import * as banTinDaXem from "./schema/banTinDaXem";

import { env } from "@/env.mjs";

const connection = connect({
	host: env.DATABASE_HOST,
	username: env.DATABASE_USERNAME,
	password: env.DATABASE_PASSWORD,
});

export const db = drizzle(connection, {
	schema: {
		...BanTin,
		...chuyenGia,
		...danhGia,
		...danhMuc,
		...nguoiDung,
		...nhanVien,
		...yeuCau,
		...banTinDaLuu,
		...banTinDaXem,
	},
	logger: true,
});
