"use client";

import { useUser } from "@clerk/nextjs";

import { UserProfile } from "@clerk/nextjs";
import { Spinner } from "@nextui-org/react";

export default function UserProfilePage() {
	const { isLoaded } = useUser();

	return (
		<div className="flex h-full items-start justify-center">
			{!isLoaded ? (
				<div className="flex h-full flex-1 items-center justify-center">
					<Spinner label="Loading..." color="primary" />
				</div>
			) : (
				<UserProfile
					appearance={{
						elements: {
							rootBox: { width: "100%" },
							card: { margin: 0 },
							navbar: { padding: "1.5rem 1rem" },
							pageScrollBox: { padding: "1.5rem 1rem" },
						},
					}}
				/>
			)}
		</div>
	);
}
