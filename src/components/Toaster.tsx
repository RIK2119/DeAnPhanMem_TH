"use client";

import { Toaster as Toast } from "react-hot-toast";

export const Toaster = () => (
	<Toast
		position="top-right"
		toastOptions={{
			style: { borderRadius: "1rem", background: "#333", color: "#fff" },
		}}
	/>
);
