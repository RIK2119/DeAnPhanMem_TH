import { ThongTinChungTab } from "@/components/nguoi-dung/thong-tin-chung";
import { SignOutButton, currentUser } from "@clerk/nextjs";

import { Button } from "@ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@ui/tabs";

export default async function UserProfilePage({ searchParams: { tab } }: { searchParams: { tab: string | undefined } }) {
	const user = await currentUser();
	if (!user) return;

	return (
		<div className="max-w container mx-auto flex h-screen flex-col gap-y-5 py-5 pt-28 ">
			<Tabs defaultValue={tab ?? "thong-tin-chung"} orientation="vertical" className="flex h-full gap-5">
				<TabsList className="h-max w-1/4 flex-col gap-1">
					<TabsTrigger className="w-full py-3" value="thong-tin-chung">
						Thông tin chung
					</TabsTrigger>

					<TabsTrigger className="w-full py-3" value="tin-da-luu">
						Tin đã lưu
					</TabsTrigger>

					<TabsTrigger className="w-full py-3" value="tin-da-xem">
						Tin đã xem
					</TabsTrigger>

					<TabsTrigger className="w-full py-3" value="thoat">
						Thoát
					</TabsTrigger>
				</TabsList>

				<ThongTinChungTab user={user} />

				<TabsContent value="tin-da-luu" className="mt-0 w-full">
					<Card className="flex flex-col">
						<CardHeader>
							<CardTitle className="text-center text-2xl font-bold">Tin đã lưu</CardTitle>
						</CardHeader>
						<CardContent className="space-y-2">
							<div></div>
						</CardContent>
					</Card>
				</TabsContent>

				<TabsContent value="tin-da-xem" className="mt-0 w-full">
					<Card className="flex flex-col">
						<CardHeader>
							<CardTitle className="text-center text-2xl font-bold">Tin đã xem</CardTitle>
						</CardHeader>
						<CardContent className="space-y-2">
							<div></div>
						</CardContent>
					</Card>
				</TabsContent>

				<TabsContent value="thoat" className="mt-0 h-full w-full">
					<Card className="flex flex-col">
						<CardHeader>
							<CardTitle className="text-center text-2xl font-bold">Thoát</CardTitle>
							<CardDescription className="text-center">
								Bạn có chắc chắn bạn muốn thoát khỏi tài khoảng này không?
							</CardDescription>
						</CardHeader>
						<CardContent className="flex items-center justify-center space-y-2">
							<SignOutButton>
								<Button> Thoát </Button>
							</SignOutButton>
						</CardContent>
					</Card>
				</TabsContent>
			</Tabs>
		</div>
	);
}
