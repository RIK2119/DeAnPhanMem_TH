import { currentUser } from "@clerk/nextjs";

export default async function UserProfilePage() {
	const user = await currentUser();
	if (!user) return;

	return <div className="flex w-full flex-col"></div>;
}
