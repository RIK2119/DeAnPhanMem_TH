import { Card } from "@/components/ui/card";
import { Loader2 } from "lucide-react";

export default function LoadingLayout() {
	return (
		<Card className="flex h-full flex-col">
			<div className="flex h-full items-center justify-center gap-2">
				<span>Đang tải </span>

				<div className="animate-spin">
					<Loader2 />
				</div>
			</div>
		</Card>
	);
}
