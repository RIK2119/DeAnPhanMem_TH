import { db } from "@/server/db/client";
import { BanTinTable } from "@/server/db/schema/banTin";
import { DanhMucTable } from "@/server/db/schema/danhMuc";
import { NhanVienTable } from "@/server/db/schema/nhanVien";

import { type InferModel } from "drizzle-orm";
import { v4 } from "uuid";

export const dynamic = "force-dynamic";

export async function GET() {
	const { danhMuc, nhanVien } = await db.transaction(async (tx) => {
		const danhMucInsert: InferModel<typeof DanhMucTable, "insert"> = {
			maDanhMuc: v4(),
			tenDanhMuc: "Kinh Doanh",
			moTa: "",
		};

		const nhanvienInsert: InferModel<typeof NhanVienTable, "insert"> = {
			maNhanVien: v4(),
			ngaySinh: new Date(),
			ngayVaoLam: new Date(),
			soDT: "0909090909",
			phongBan: "Phong Vien",
			caLamViec: "Sang",
			chucVu: "Truong phong",
			tenNhanVien: "",
			luong: "10000.0",
		};

		await tx.insert(NhanVienTable).values(nhanvienInsert);
		await tx.insert(DanhMucTable).values(danhMucInsert);

		return { danhMuc: danhMucInsert, nhanVien: nhanvienInsert };
	});

	const bantin: InferModel<typeof BanTinTable, "insert">[] = [
		{
			maBanTin: v4(),
			tenBanTin: "Đóng cửa ba sân bay tránh bão",
			noiDung:
				"Các sân bay Nội Bài, Vân Đồn, Cát Bi sẽ tạm dừng tiếp nhận máy bay trong ngày 18/7, theo chỉ đạo của Cảng vụ Hàng không miền Bắc. \nSân bay Nội Bài (Hà Nội) dừng tiếp nhận tàu bay đi, đến từ 11h đến 20h ngày 18/7, sân bay Vân Đồn (Quảng Ninh) và",
			noiDungTomTat:
				"Các sân bay Nội Bài, Vân Đồn, Cát Bi sẽ tạm dừng tiếp nhận máy bay trong ngày 18/7, theo chỉ đạo của Cảng vụ Hàng không miền Bắc. \nSân bay Nội Bài (Hà Nội) dừng tiếp nhận tàu bay đi, đến từ 11h đến 20h ngày 18/7, sân bay Vân Đồn (Quảng Ninh) và",
			trangThai: "Đã duyệt",
			maDanhMuc: danhMuc.maDanhMuc,
			maNhanVien: nhanVien.maNhanVien,
			hinhNho:
				"https://i1-vnexpress.vnecdn.net/2023/07/17/noibai12851611216426-168959348-5758-2454-1689594097.jpg?w=680&h=408&q=100&dpr=1&fit=crop&s=njbUZXcowLLv4swRXTOTDw",
		},
		{
			maBanTin: v4(),
			tenBanTin: "Bi cáo vụ chuyến bay giải cứu tố cấp dưới 'gian dối', 'tư thù'",
			noiDung:
				'Hà NộiĐược cấp dưới chia 3 tỷ đồng từ "lộc" của doanh nghiệp, cựu Cục phó Xuất nhập cảnh Trần Văn Dự khai đến lúc đọc cáo trạng mới "tá hỏa" khi biết cấp dưới nhận tới 27 tỷ đồng, chứ không phải 7,5 tỷ.',
			noiDungTomTat:
				'Hà NộiĐược cấp dưới chia 3 tỷ đồng từ "lộc" của doanh nghiệp, cựu Cục phó Xuất nhập cảnh Trần Văn Dự khai đến lúc đọc cáo trạng mới "tá hỏa" khi biết cấp dưới nhận tới 27 tỷ đồng, chứ không phải 7,5 tỷ.',
			trangThai: "Đã duyệt",
			maDanhMuc: danhMuc.maDanhMuc,
			maNhanVien: nhanVien.maNhanVien,
			hinhNho:
				"https://i1-vnexpress.vnecdn.net/2023/07/17/du-jpeg-1689605723-6930-1689606729.jpg?w=680&h=408&q=100&dpr=1&fit=crop&s=C6GUpM3SMaALAfqilfvljQ",
		},
		{
			maBanTin: v4(),
			tenBanTin: "Chứng khoán tăng phiên thứ 7 liên tiếp",
			noiDung: "VN-Index giữ sắc xanh trong phiên đầu tuần, khi dòng tiền tập trung vào nhóm bất động sản và một số mã vốn hóa thấp.",
			noiDungTomTat:
				"VN-Index giữ sắc xanh trong phiên đầu tuần, khi dòng tiền tập trung vào nhóm bất động sản và một số mã vốn hóa thấp.",
			trangThai: "Đã duyệt",
			maDanhMuc: danhMuc.maDanhMuc,
			maNhanVien: nhanVien.maNhanVien,
			hinhNho:
				"https://i1-kinhdoanh.vnecdn.net/2023/07/17/QUYN8215-1689587141-9996-1689587185.jpg?w=380&h=228&q=100&dpr=1&fit=crop&s=3h71MiM8dF_VkNjT6g3pug",
		},
	];
	await db.insert(BanTinTable).values(bantin);

	return { success: true };
}
