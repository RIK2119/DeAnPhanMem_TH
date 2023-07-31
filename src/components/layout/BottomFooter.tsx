import { ActivitySquare } from "lucide-react";

export const BottomFooter = () => {
	return (
		<footer className="container mx-auto flex-none py-4">
			<div>
				<h2 className="flex text-red-500">
					Bản tin 24h <img src="/favicon.png" alt="Bản tin 24h" className="flex w-40" />
				</h2>
			</div>
			<div>
				<h2>Điều khoảng sử dụng</h2>
				<h2>RSS</h2>
				<h2>
					Theo dõi Bản tin 24h trên
					<ActivitySquare />
				</h2>
			</div>
		</footer>
	);
};
