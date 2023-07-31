import { db } from "@/server/db/client";
import { BanTinTable } from "@/server/db/schema/banTin";
import { DanhMucTable } from "@/server/db/schema/danhMuc";
import { NhanVienTable } from "@/server/db/schema/nhanVien";

import { type InferModel } from "drizzle-orm";
import { v4 } from "uuid";

export const dynamic = "force-dynamic";

export async function GET() {
	const { danhMuc, nhanVien } = await db.transaction(async (tx) => {
		const danhMucInsert: InferModel<typeof DanhMucTable, "insert">[] = [
			{
				maDanhMuc: v4(),
				tenDanhMuc: "Kinh Doanh",
			},
			{
				maDanhMuc: v4(),
				tenDanhMuc: "Thời sự",
			},
			{
				maDanhMuc: v4(),
				tenDanhMuc: "Giáo dục",
			},
		];

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
			noiDung: `Các sân bay Nội Bài, Vân Đồn, Cát Bi sẽ tạm dừng tiếp nhận máy bay trong ngày 18/7, theo chỉ đạo của Cảng vụ Hàng không miền Bắc.

Sân bay Nội Bài (Hà Nội) dừng tiếp nhận tàu bay đi, đến từ 11h đến 20h ngày 18/7, sân bay Vân Đồn (Quảng Ninh) và Cát Bi (Hải Phòng) dừng từ 9h đến 19h ngày 18/7. Lý do Quảng Ninh và Hải Phòng khả năng chịu ảnh hưởng trực tiếp của bão Talim, Hà Nội chịu tác động xa, có mây giông, tầm nhìn giảm.

Theo yêu cầu của Cảng vụ Hàng không miền Bắc, các hãng, đơn vị liên quan trực 24/24h và điều chỉnh lịch bay phù hợp. Cảng Vân Đồn, Cát Bi di chuyển tàu bay đến cảng khác hoặc tổ chức chằng néo tàu bay đỗ tại cảng.

![Thời tiết xấu tại các sân bay Nội Bài. Ảnh: Ngọc Thành](https://i1-vnexpress.vnecdn.net/2023/07/17/noi-bai-1285-1611216426-5703-1689594097.jpg?w=680&h=0&q=100&dpr=1&fit=crop&s=PRJXFSPtq9LDgB1yhYGQbg)

Sau khi có yêu cầu của nhà chức trách, Vietnam Airlines đã hủy các chuyến bay nội địa đến và đi từ Nội Bài từ 11h đến 20h ngày 18/7. Đối với sân bay Cát Bi, các chuyến bay VN1182, VN1183 giữa TP HCM và Hải Phòng sẽ không khai thác. Trước đó, hãng thông báo hủy hoặc thay đổi lịch nhiều chuyến bay đến và đi từ Hải Phòng do ảnh hưởng của bão. Vietnam Airlines không có chuyến bay đến sân bay Vân Đồn trong ngày 18/7.

Đối với mạng bay quốc tế, các chuyến bay khởi hành từ Hà Nội khung 11h-20h ngày 18/7 sẽ thay đổi giờ cất cánh đến sau 20h cùng ngày.

Các chuyến bay quốc tế có kế hoạch hạ cánh tại Hà Nội từ 11h đến 20h ngày 18/7 cũng sẽ lùi giờ khởi hành. Cụ thể, hãng sẽ lùi giờ cất cánh từ 2 đến 10 tiếng đối với các chuyến bay từ Nhật Bản, Hàn Quốc, Bắc Kinh (Trung Quốc), Đài Bắc, Cao Hùng (Đài Loan, Trung Quốc), Bangkok (Thái Lan), Singapore, Campuchia, Mumbai (Ấn Độ), Kuala Lumpur (Malaysia) về Hà Nội trong ngày 18/7. Các chuyến bay quốc tế khác tạm thời giữ theo lịch khai thác ban đầu nhưng có thể được điều chỉnh theo ảnh hưởng thực tế của cơn bão.

Các hãng khác cũng đang điều chỉnh kế hoạch bay theo chỉ đạo của nhà chức trách. Do ảnh hưởng của bão có thể kéo dài, các hãng khuyến nghị hành khách đang có kế hoạch đến, đi từ các sân bay trong vùng ảnh hưởng bão thường xuyên cập nhật thời tiết và thông tin từ hãng.

Theo Trung tâm Dự báo Khí tượng Thủy văn quốc gia, đêm nay bão Talim vượt bán đảo Lôi Châu (Trung Quốc), đi theo bờ biển Trung Quốc và đổ bộ vùng biên giới với Việt Nam với sức gió mạnh nhất cấp 9, giảm một cấp so với dự báo lúc sáng. 16h ngày mai, tâm bão trên khu vực Đông Bắc Bộ, sức gió giảm còn cấp 8. Những giờ tiếp theo, bão duy trì hướng và tốc độ, đi sâu vào đất liền và suy yếu thành áp thấp nhiệt đới ở Tây Bắc Bộ vào ngày 19/7.`,
			noiDungTomTat:
				"Các sân bay Nội Bài, Vân Đồn, Cát Bi sẽ tạm dừng tiếp nhận máy bay trong ngày 18/7, theo chỉ đạo của Cảng vụ Hàng không miền Bắc.",
			trangThai: "Đã duyệt",
			maDanhMuc: danhMuc[1]!.maDanhMuc,
			maNhanVien: nhanVien.maNhanVien,
			hinhNho:
				"https://i1-vnexpress.vnecdn.net/2023/07/17/noibai12851611216426-168959348-5758-2454-1689594097.jpg?w=680&h=408&q=100&dpr=1&fit=crop&s=njbUZXcowLLv4swRXTOTDw",
		},
		{
			maBanTin: v4(),
			tenBanTin: "Phó tổng giám đốc Vietnam Airlines: Hãng hàng không phải giữ slot bay dù khách giảm",
			noiDung: `Lượng khách giảm, các hãng hàng không Việt Nam vẫn phải bay đều nếu không sẽ mất slot cho năm sau, theo Phó tổng giám đốc Vietnam Airlines Trịnh Ngọc Thành.

Thông tin trên được ông Thành nêu tại hội nghị triển khai kế hoạch của Cục Hàng không Việt Nam ngày 24/7. Phó tổng giám đốc Vietnam Airlines cho biết nếu tính số chuyến, ngành hàng không cơ bản đã phục hồi trên các đường bay quốc tế đi/đến Nội Bài, Tân Sơn Nhất. Tuy nhiên, về số lượng khách lại khác.

Đến tháng 7, tổng lượng khách Trung Quốc vào Việt Nam mới đạt 10%, khách Nhật đạt 54% so với năm 2019. Riêng khách Hàn Quốc đạt 80% do khách công vụ nhiều. Khả quan nhất là khách Ấn Độ tăng gần gấp đôi, còn Australia và Mỹ tăng hơn 10%.

Tại thị trường nội địa, lượng khách vượt so với năm 2019 khoảng 10% nhưng bình quân 6 tháng giảm so với cùng kỳ năm ngoái. Cao điểm hè, lượng khách tăng 14% nhưng giá vé bình quân giảm 14%. Nguyên nhân là cung vượt cầu, các hãng hàng không không bay được quốc tế nên dồn tải vào thị trường nội địa.

Ông Thành cho rằng Bộ Giao thông Vận tải, Cục Hàng không đánh giá bằng số lượng chuyến bay còn hãng đánh giá bằng lượng khách. Do đó, dù lượng khách giảm, các hãng vẫn cố giữ slot cho lịch bay mùa hè năm sau nên phải cố gắng bay mà không quan tâm đến hệ số sử dụng ghế. Điều này càng khiến hãng hàng không gặp khó.

"Thực tế, hàng không đã phục hồi cơ bản cả nội địa và quốc tế. Tuy nhiên, hệ số sử dụng ghế bình quân trên các đường bay quốc tế chỉ khoảng 67-68%, thấp hơn 10% so với 2019", ông nói.

![Máy bay cất cánh đậu tại sân bay Tân Sơn Nhất. Ảnh: Quỳnh Trần](https://i1-kinhdoanh.vnecdn.net/2023/07/24/QUYN6582-1793-1690209733.jpg?w=680&h=0&q=100&dpr=1&fit=crop&s=DiVlxDpszrk7sPyJY3A5XA)

Đồng quan điểm, ông Đinh Việt Phương, Tổng giám đốc Vietjet Air cũng cho rằng các hãng hàng không đang khó khăn. Bởi số chuyến bay tăng nhưng số khách không tăng, hệ số sử dụng ghế giảm. Nguyên nhân là thị trường giảm, sức mua giảm. Lượng khách quốc tế tăng so với năm trước song không đạt như kỳ vọng so với thời điểm trước dịch. Đặc biệt, lượng khách quốc tế đến từ khu vực Đông Bắc Á rất thấp. Các nước như Trung Quốc, Nhật Bản vẫn đang khuyến khích người dân du lịch trong nước.

Ông Phương cho biết thông thường, cao điểm hè kéo dài đến khoảng 15/8, thậm chí là tuần thứ 3 của tháng 8. Nhưng năm nay, mới đến 15/7, lượng khách đã giảm. Dù khách giảm, hãng vẫn phải bay đều vì không bay thì sợ mất slot lịch sử.

"Cơ quan nhà nước giám sát chặt việc sử dụng slot nhưng phải hỗ trợ hãng hàng không. Slot là tài nguyên nhưng vận hành slot phải linh hoạt, hiệu quả, làm sao thúc đẩy hãng hàng không phát triển", ông Phương kiến nghị.

Cục trưởng Cục Hàng không Việt Nam Đinh Việt Thắng cho biết việc các hãng hàng không đang phải "bay để giữ slot", là có thật.

Với các nhà chức trách hàng không nước ngoài, có bay mới giữ được slot. Nếu năm nay hãng bay Việt Nam không bảo đảm số lượng chuyến, năm sau họ sẽ cắt slot. Cục Hàng không đã trao đổi với nhà chức trách hàng không các nước để hỗ trợ theo nguyên tắc "có đi có lại", song khó đàm phán do các hãng hàng không nước bạn không bay đến Việt Nam như Australia, Ấn Độ, Vương quốc Anh.

"Những trường hợp hết sức khó khăn, ngoài khả năng của Cục Hàng không, chúng tôi sẽ đề nghị đàm phán ở những cấp cao hơn, qua đường ngoại giao", ông Thắng cam kết.

Trên thị trường nội địa, ông Thắng cho biết Thông tư 29 quy định rõ, slot lịch sử của một mùa lịch bay là chuỗi slot được sử dụng đúng với tỷ lệ ít nhất 80%. Khi thị trường xuống thấp như hiện nay, cơ quan quản lý nhà nước cũng muốn linh hoạt cho các hãng không phải đảm bảo đủ tỷ lệ slot sử dụng theo quy định vẫn giữ được slot lịch sử. Tuy nhiên, pháp luật quy định, muốn thay đổi phải sửa thông tư.

"Những kiến nghị này của doanh nghiệp là hợp lý. Chúng tôi sẽ nghiên cứu sớm, báo cáo Bộ Giao thông Vận tải sửa đổi Thông tư 29", ông Thắng khẳng định.

6 tháng đầu năm, tổng thị trường hành khách hàng không ước đạt gần 35 triệu khách, tăng hơn 49% so với cùng kỳ 2022. Trong đó, khách quốc tế đạt 14,7 triệu khách, tăng gần 5 lần so với cùng kỳ năm ngoái, bằng 74% so cùng kỳ 2019. Khách nội địa đạt 20 triệu khách, giảm 3,4% nhưng tăng hơn 8% so cùng kỳ 2019.

Theo Hiệp hội Vận tải hàng không thế giới (IATA), thị trường vận tải hàng không quốc tế đã cơ bản ổn định nhưng phục hồi chậm, chỉ bằng 88% so với 2019. Dự kiến, đến năm 2024 mới có thể về bằng mức trước dịch Covid-19.`,
			noiDungTomTat:
				"Lượng khách giảm, các hãng hàng không Việt Nam vẫn phải bay đều nếu không sẽ mất slot cho năm sau, theo Phó tổng giám đốc Vietnam Airlines Trịnh Ngọc Thành.",
			trangThai: "Đã duyệt",
			maDanhMuc: danhMuc[0]!.maDanhMuc,
			maNhanVien: nhanVien.maNhanVien,
			hinhNho:
				"https://i1-vnexpress.vnecdn.net/2023/07/17/du-jpeg-1689605723-6930-1689606729.jpg?w=680&h=408&q=100&dpr=1&fit=crop&s=C6GUpM3SMaALAfqilfvljQ",
		},
		{
			maBanTin: v4(),
			tenBanTin: "Chứng khoán tăng phiên thứ 7 liên tiếp",
			noiDung: `VN-Index giữ sắc xanh trong phiên đầu tuần, khi dòng tiền tập trung vào nhóm bất động sản và một số mã vốn hóa thấp.
			
Đà tăng liên tiếp của chứng khoán khiến giới phân tích tỏ ra thận trọng về xu hướng, tuy nhiên sắc xanh vẫn chiếm ưu thế trên bảng điện. VN-Index mở phiên đầu tuần này trong sắc xanh, dù biên độ tăng không quá áp đảo. Dòng tiền phân hóa, hướng vào nhóm bất động sản, penny giúp cân bằng lại với sắc đỏ ở một số mã tài chính và bán lẻ.
			
Nhịp giao dịch không quá đột biến với xu hướng giằng co trong biên độ hẹp tới khi hết giờ. Chốt phiên, VN-Index tăng 4,73 điểm (0,4%) lên 1.173,13 điểm. VN30-Index tăng gần 4 điểm (0,34%) lên 1.164,58 điểm. Trên sàn Hà Nội, HNX-Index và UPCOM-Index cùng chốt phiên trong sắc xanh.
			
![VN-Index chốt phiên 17/7 tăng gần 5 điểm. Ảnh: VNDirect](https://i1-kinhdoanh.vnecdn.net/2023/07/17/A-nh-ma-n-hi-nh-2023-07-17-lu-6832-5529-1689587185.png?w=680&h=0&q=100&dpr=1&fit=crop&s=KNmyumMG-5f_iy39k_xaMg)
			
Sắc xanh chiếm ưu thế trên bảng điện, với 260 mã tăng trên HoSE, so với 171 mã giảm. Riêng nhóm vốn hóa lớn, trạng thái cân bằng hơn với số mã tăng và giảm giữ tỷ lệ 14:13.
			
Trong VN30, nhóm bất động sản cũng áp đảo về sắc xanh. VHM chốt phiên là mã tích cực nhất khi tăng 4,6%, theo sau là PDR, VIC tăng quanh ngưỡng 3%, VRE có thêm 2,3%, GVR, NVL vượt tham chiếu hơn 1%. Sắc xanh của nhóm bất động sản giúp cân bằng lại đà giảm của một số mã ngân hàng và bán lẻ.
			
STB tiếp tục bị bán ra ồ ạt, chốt phiên giảm 3,4%. Ở nhóm bán lẻ và hàng tiêu dùng, MWG, MSN, VNM mất hơn 1%. Ngoài ra, BID, BCM, HPG, CTG khép phiên trong sắc đỏ.
			
Với phân khúc vốn hóa trung bình, một số cổ phiếu bất động sản cũng được chú ý. QCG tăng kịch trần, DXS cũng chốt phiên ở trạng thái "trắng bảng bên bán", HQC, DIG có thêm hơn 3%. Nhóm penny giao dịch sôi động với sắc xanh chiếm áp đảo, nhiều mã tăng trần.
			
Thanh khoản thị trường giữ ở mức cao với giá trị giao dịch trên HoSE đạt hơn 18.600 tỷ đồng, riêng nhóm VN30 giao dịch gần 7.700 tỷ.`,
			noiDungTomTat:
				"VN-Index giữ sắc xanh trong phiên đầu tuần, khi dòng tiền tập trung vào nhóm bất động sản và một số mã vốn hóa thấp.",
			trangThai: "Đã duyệt",
			maDanhMuc: danhMuc[0]!.maDanhMuc,
			maNhanVien: nhanVien.maNhanVien,
			hinhNho:
				"https://i1-kinhdoanh.vnecdn.net/2023/07/17/QUYN8215-1689587141-9996-1689587185.jpg?w=380&h=228&q=100&dpr=1&fit=crop&s=3h71MiM8dF_VkNjT6g3pug",
		},
		{
			maBanTin: v4(),
			tenBanTin: "Điểm sàn Đại học Luật, Kinh tế TP HCM dao động 20-24",
			noiDung: `Trường Đại học Luật TP HCM nhận hồ sơ xét tuyển với thí sinh đạt 20-24 điểm, trong khi Đại học Kinh tế TP HCM lấy sàn 20 cho tất cả ngành đào tạo.

Chiều 24/7, **trường Đại học Luật TP HCM** (ULAW) thông báo mức điểm nhận hồ sơ xét tuyển từ điểm thi tốt nghiệp dao động 20-24. Đây là tổng điểm ba môn thi trong tổ hợp xét tuyển, gồm điểm ưu tiên.

Trong đó, ngành Luật xét tổ hợp khối C00 (Văn, Sử, Địa) lấy cao nhất. Thí sinh phải đạt trung bình mỗi môn 8 điểm trở lên, nếu không có điểm ưu tiên. Các khối xét tuyển khác, ngành này lấy mức sàn 20 điểm.

Ngành Luật Thương mại quốc tế có mức sàn cao thứ hai với 23 điểm ở tất cả tổ hợp xét tuyển. Ngành Quản trị kinh doanh lấy điểm sàn 21. Các ngành còn lại cùng lấy mức 20 điểm.
Điểm sàn Đại học Luật TP HCM như sau:

![Điểm sàn Đại học Luật TP HCM dao động 20-24](https://i1-vnexpress.vnecdn.net/2023/07/24/diem-san-dh-luat-4095-1690201438.jpg?w=680&h=0&q=100&dpr=1&fit=crop&s=KBa5H6xNyppQdNaWty5uaQ)

Năm nay, trường Đại học Luật TP HCM tuyển sinh 2.100 sinh viên. Cuối tháng 6, trường đã công bố điểm chuẩn phương thức xét tuyển sớm. Với phương thức xét kết hợp học bạ và IELTS (hoặc TOEFL), ngành Luật Thương mại quốc tế có điểm chuẩn cao nhất. Nếu thí sinh có điểm trung bình học bạ là 22,5 thì phải kèm 7.5 IELTS mới trúng tuyển, nếu điểm học bạ là 28 thì thí sinh chỉ cần IELTS 7.0.

Với phương thức xét tuyển học sinh diện ưu tiên bằng học bạ, điểm chuẩn ngành Luật Thương mại quốc tế cũng cao nhất, lần lượt là 28 và 24,5 điểm tùy theo điểm trung bình học bạ cả ba năm hay điểm trung bình ba môn thuộc tổ hợp trong 5 học kỳ.

Ngoài hai phương thức xét tuyển nói trên, trường còn xét tuyển bằng điểm thi tốt nghiệp THPT với 60% chỉ tiêu. Điểm chuẩn được công bố trước 17h ngày 22/8. Năm ngoái, điểm chuẩn theo kết quả thi tốt nghiệp của Đại học Luật TP HCM dao động 22,5-28,5.


![Thí sinh dự thi tốt nghiệp THPT ngày 28/6, tại TP HCM. Ảnh: Thanh Tùng](https://i1-vnexpress.vnecdn.net/2023/07/24/thi-11-jpg-1687922984-16902016-1534-3798-1690201775.jpg?w=680&h=0&q=100&dpr=1&fit=crop&s=O-_QqPNs21pGHN6sDuf9Og)

Hôm nay, **Đại học Kinh tế TP HCM** (UEH) cũng công bố mức sàn xét tuyển. Các ngành, chương trình đào tạo tại TP HCM có cùng mức sàn là 20 điểm. Các ngành đào tạo tại phân hiệu Vĩnh Long của trường nhận hồ sơ từ 16 điểm.

Đại học Kinh tế TP HCM tuyển 7.650 sinh viên cho cơ sở TP HCM và 600 cho cơ sở Vĩnh Long với 6 phương thức xét tuyển. Trường đã công bố điểm chuẩn ở ba phương thức, gồm xét học sinh giỏi, kết quả học tập theo tổ hợp môn (học bạ) và dựa vào điểm thi đánh giá năng lực Đại học Quốc gia TP HCM.

Theo đó, điểm chuẩn của 51 chương trình đào tạo tại TP HCM dao động 47-77 với phương thức xét học sinh giỏi và học bạ; 800-985/1.200 đối với phương thức xét điểm đánh giá năng lực. Ngành Logistics và Quản lý chuỗi cung ứng có điểm chuẩn cao nhất ở cả ba phương thức.

Ngoài ra, trường còn xét tuyển thẳng, xét thí sinh tốt nghiệp chương trình THPT nước ngoài và có chứng chỉ quốc tế, xét điểm thi tốt nghiệp THPT. Năm ngoái, điểm chuẩn theo phương thức xét điểm thi tốt nghiệp của UEH dao động 23,6-27,8 tại cơ sở TP HCM, 16-17 tại cơ sở Vĩnh Long.`,
			noiDungTomTat:
				"Trường Đại học Luật TP HCM nhận hồ sơ xét tuyển với thí sinh đạt 20-24 điểm, trong khi Đại học Kinh tế TP HCM lấy sàn 20 cho tất cả ngành đào tạo.",
			trangThai: "Đã duyệt",
			maDanhMuc: danhMuc[2]!.maDanhMuc,
			maNhanVien: nhanVien.maNhanVien,
			hinhNho:
				"https://i1-vnexpress.vnecdn.net/2023/07/24/thi-11-jpg-1687922984-16902016-1534-3798-1690201775.jpg?w=680&h=0&q=100&dpr=1&fit=crop&s=O-_QqPNs21pGHN6sDuf9Og",
		},
	];
	await db.insert(BanTinTable).values(bantin);

	return { success: true };
}
