"use client";

import type { ReactNode } from "react";
// import { useAutoAnimate } from "@formkit/auto-animate/react";

const MainLayout = ({ children }: { children: ReactNode }) => {
	// const [parent] = useAutoAnimate();

	return <main className="h-full max-h-max max-w-full flex-1 overflow-hidden">{children}</main>;
};
export { MainLayout };
