import { Separator } from "../ui/separator";

export const BottomFooter = () => {
	return (
		<footer className="container mx-auto flex-none py-4">
			<div className="flex items-center justify-between">
				<h2>Bản Tin 24H</h2>
			</div>

			<Separator orientation="horizontal" />

			<div className="grid grid-cols-3">
				<div>
					<h4 className="font-bold">Bản tin tiếng việt được 0 người đọc</h4>
					<p>Thuộc Khoa Công nghệ phần mềm</p>
				</div>

				<div>
					<span className="block">Dev chính: Phùng Tấn Phát</span>
					<span className="block">Dev phụ: Trần Thanh Phú</span>
					<span className="block">Dev phụ: Trí</span>
					<span className="block">Địa chỉ: 828 Sư Vạn Hạnh, phường 13, Quận 10, Thành phố Hồ Chí Minh, Việt Nam</span>
				</div>

				<span>© 2023-2023. Toàn bộ bản quyền thuộc Asakuri-Noki</span>
			</div>
		</footer>
	);
};
