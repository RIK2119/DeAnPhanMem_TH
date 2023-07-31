import { NguoiDungSideBar } from "@/components/nguoi-dung/side-bar";

import type { ReactNode } from "react";

export default function NguoiDungLayout({ children }: { children: ReactNode }) {
	return (
		<div className="max-w container mx-auto flex gap-5 py-5 pt-28">
			<NguoiDungSideBar />

			<div className="w-4/5">{children}</div>
		</div>
	);
}
