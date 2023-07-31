import type { User } from "@clerk/clerk-sdk-node";

import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@ui/dropdown-menu";

import { Avatar, AvatarFallback, AvatarImage } from "@ui/avatar";
import Link from "next/link";

export function UserDropdown({ user }: { user: User }) {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<button className="rounded-full">
					<Avatar>
						<AvatarImage src={user.imageUrl} alt={user.username!} />
						<AvatarFallback>{user.username}</AvatarFallback>
					</Avatar>
				</button>
			</DropdownMenuTrigger>

			<DropdownMenuContent className="w-56 rounded-lg">
				<DropdownMenuLabel className="flex items-center gap-4">
					<Avatar>
						<AvatarImage src={user.imageUrl} alt={user.username!} />
						<AvatarFallback>{user.username}</AvatarFallback>
					</Avatar>

					<span>{user.username}</span>
				</DropdownMenuLabel>

				<DropdownMenuSeparator />

				<DropdownMenuGroup>
					<DropdownMenuItem>
						<Link href={{ pathname: "/auth/nguoi-dung/thong-tin-chung" }}>Thông tin chung</Link>
					</DropdownMenuItem>
					<DropdownMenuItem>
						<Link href={{ pathname: "/auth/nguoi-dung/tin-da-luu" }}>Bản tin đã lưu</Link>
					</DropdownMenuItem>
					<DropdownMenuItem>
						<Link href={{ pathname: "/auth/nguoi-dung/tin-da-xem" }}>Bản tin đã xem</Link>
					</DropdownMenuItem>
				</DropdownMenuGroup>

				<DropdownMenuSeparator />

				<DropdownMenuItem>Đăng xuất</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
