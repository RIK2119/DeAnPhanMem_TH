import { currentUser } from "@clerk/nextjs";

import { Card, CardContent, CardHeader, CardTitle } from "@ui/card";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@ui/collapsible";
import { Separator } from "@ui/separator";

import Image from "next/image";
import { toast } from "react-hot-toast";

export default async function UserProfilePage() {
	const user = await currentUser();
	if (!user) return;

	return (
		<Card className="flex flex-col">
			<CardHeader>
				<CardTitle className="text-center text-2xl font-bold">Thông tin chung</CardTitle>
			</CardHeader>
			<CardContent>
				<div className="flex flex-col gap-y-5">
					<div>
						<div className="flex items-center justify-between py-2">
							<h3 className="text-xl">Mã ID người dùng</h3>

							<button
							// eslint-disable-next-line @typescript-eslint/no-misused-promises
							// onClick={async () => {
							// 	await window.navigator.clipboard.writeText(user.id);

							// 	toast.success("Copy mã ID thành công");
							// }}
							>
								Sao chép mã ID
							</button>
						</div>

						<span className="text-sm text-gray-400">{user.id}</span>
					</div>

					<Separator orientation="horizontal" />

					<div>
						<div className="flex items-center justify-between py-2">
							<h3 className="text-xl">Ảnh đại diện</h3>

							<button>Thay đổi ảnh đại diện</button>
						</div>

						<Image
							src={user.profileImageUrl}
							alt="Ảnh đại diện của người dùng"
							width={36}
							height={36}
							className="rounded-full"
						/>
					</div>

					<Separator orientation="horizontal" />

					<div>
						<div className="flex items-center justify-between py-2">
							<h3 className="text-xl">Họ Tên</h3>

							<button>Thay đổi</button>
						</div>

						<span className="text-sm text-gray-400">{user.username}</span>
					</div>

					<Separator orientation="horizontal" />

					<div>
						<div className="flex items-center justify-between py-2">
							<h3 className="text-xl">Email</h3>
						</div>

						<div className="flex flex-col">
							{user.emailAddresses.map((email) => {
								return (
									<div key={email.id}>
										<Collapsible>
											<CollapsibleTrigger></CollapsibleTrigger>

											<CollapsibleContent className="space-y-2">
												<div className="rounded-md border px-4 py-2 font-mono text-sm shadow-sm"></div>
												<div className="rounded-md border px-4 py-2 font-mono text-sm shadow-sm"></div>
											</CollapsibleContent>
										</Collapsible>
									</div>
								);
							})}
						</div>
					</div>
				</div>
			</CardContent>
		</Card>
	);
}
