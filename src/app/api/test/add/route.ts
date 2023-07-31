import { db } from "@/server/db/client";
import { BanTinTable } from "@/server/db/schema/banTin";
import { DanhMucTable } from "@/server/db/schema/danhMuc";
import { NhanVienTable } from "@/server/db/schema/nhanVien";

import { type InferModel } from "drizzle-orm";
import { NextResponse } from "next/server";
import { v4 } from "uuid";

export const dynamic = "force-dynamic";

export async function GET(req: Request) {
	const danhMuc = await db.transaction(async (tx) => {
		return await tx.query.DanhMucTable.findMany();
	});

	console.log(danhMuc);

	return NextResponse.json({ success: true, danhMuc });
}

export async function POST(req: Request) {
	const data = (await req.json()) as {
		tenBanTin: string;
		danhMuc: string;
		noiDungTomGon: string;
		noiDung: string;
		hinhNho: string;
	};

	const DanhMucId = {
		"Đời sống": "4614e05b-4b33-4e9f-8380-e14d677b2963",
		"Du lịch": "e5179c75-bb3d-44b6-a7aa-d4efae003eb5",
		"Giải trí": "415f4492-82b6-459d-8ac1-a69d414a2df6",
		"Giáo dục": "b222a016-19f5-4549-ba0f-ef81cdd924f7",
		"Góc nhìn": "58cd6dcb-0c3a-46da-8586-b3e9bb117fdc",
		"Khoa học": "ed85e9bc-0868-464b-ae5d-5d606b2e01e4",
		"Kinh doanh": "2f3c8abf-05ea-4b90-b63e-6f6f6f74cc2b",
		"Pháp luật": "a7bdc200-78bc-4c5f-84fb-0ba115f82580",
		"Số hóa": "769f48e8-05ab-43a6-8cef-6bf4e4d1fd9c",
		"Sức khỏe": "51172718-c95a-4918-b227-389d33ba6c8e",
		"Tâm sự": "0411d87b-dd3d-406f-9b7d-34b4ea55af50",
		"Thế giới": "65610365-7ae7-4618-a0e7-9efd7ac76209",
		"Thể thao": "7fece2df-d4b9-4021-8391-e9555be83287",
		"Thời sự": "1e0f89c7-a5a6-4e39-bbdf-46333108c403",
		"Thư giãn": "0c34ca20-7f5c-4a85-adac-620296371746",
		Xe: "9ebb3a75-f9a8-4778-8c85-304024f28db7",
		"Ý kiến": "825dbfca-4d10-4d17-985f-fc4d7f765992",
	};

	await db.transaction(async (tx) => {
		const danhMucInsert: InferModel<typeof BanTinTable, "insert"> = {
			hinhNho: data.hinhNho,
			maBanTin: v4(),
			noiDung: data.noiDung,
			noiDungTomTat: data.noiDungTomGon,
			tenBanTin: data.tenBanTin,
			trangThai: "Đã duyệt",
			maDanhMuc: DanhMucId[data.danhMuc],
			maNhanVien: "e7515d24-ed7d-40f6-8d47-3e0a956bd137",
		};

		await tx.insert(BanTinTable).values(danhMucInsert);
		return { danhMuc: danhMucInsert };
	});

	return NextResponse.json({ success: true });
}
