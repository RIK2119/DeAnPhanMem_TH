import { AnhDaiDien, BaoMat2Lop, EmailNguoiDung, MaIDNguoiDung, TenNguoiDung } from "@/components/nguoi-dung/thong-tin-chung";
import { currentUser } from "@clerk/nextjs";

import { Card, CardContent, CardHeader, CardTitle } from "@ui/card";
import { Separator } from "@ui/separator";

export default async function UserProfilePage() {
	const user = await currentUser();
	if (!user) return;

	return (
		<Card className="flex h-full flex-col border-none">
			<CardHeader>
				<CardTitle className="text-center text-2xl font-bold">Thông tin chung</CardTitle>
			</CardHeader>
			<CardContent>
				<div className="flex flex-col gap-y-5">
					<div>
						<MaIDNguoiDung user={user} />
					</div>

					<Separator orientation="horizontal" />

					<div>
						<AnhDaiDien user={user} />
					</div>

					<Separator orientation="horizontal" />

					<div>
						<TenNguoiDung user={user} />
					</div>

					<Separator orientation="horizontal" />

					<div>
						<EmailNguoiDung user={user} />
					</div>

					<Separator orientation="horizontal" />

					<div>
						<BaoMat2Lop user={user} />
					</div>
				</div>
			</CardContent>
		</Card>
	);
}
