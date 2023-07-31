"use client";

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { getUrl } from "@/utils/path";
import { Copy, Share, Twitter } from "lucide-react";
import Link from "next/link";
import { toast } from "react-hot-toast";

export const ChiaSeDropdown = ({ duongDanBanTin, tenBanTin, host }: { duongDanBanTin: string; tenBanTin: string; host: string }) => {
	const tweetUrl = new URL("https://twitter.com/intent/tweet");

	tweetUrl.searchParams.set("text", tenBanTin);
	tweetUrl.searchParams.set("url", getUrl(host, duongDanBanTin));

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<button title="Chia sẽ bản tin này">
					<Share size={20} />
				</button>
			</DropdownMenuTrigger>

			<DropdownMenuContent>
				<DropdownMenuItem>
					<button
						className="flex items-center justify-center gap-2"
						onClick={() => {
							const handler = async () => {
								await window.navigator.clipboard.writeText(duongDanBanTin);

								toast.success("Copy đường dẫn thành công!");
							};
							handler().catch(() => {});
						}}
					>
						<Copy size={16} /> Copy đường dẫn
					</button>
				</DropdownMenuItem>
				<DropdownMenuItem>
					<Link href={tweetUrl.toString()} target="_blank" className="flex items-center justify-center gap-2">
						<Twitter size={16} /> Chia sẽ với X
					</Link>
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
};
