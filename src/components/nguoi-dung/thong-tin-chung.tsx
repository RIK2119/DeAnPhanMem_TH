"use client";

import Image from "next/image";

import type { User } from "@clerk/clerk-sdk-node";
import { toast } from "react-hot-toast";

import { Switch } from "@ui/switch";

export const MaIDNguoiDung = ({ user }: { user: User }) => {
	return (
		<>
			<div className="flex items-center justify-between py-2">
				<h3 className="text-xl">Mã ID người dùng</h3>

				<button
					// eslint-disable-next-line @typescript-eslint/no-misused-promises
					onClick={async () => {
						await window.navigator.clipboard.writeText(user.id);

						toast.success("Copy mã ID thành công");
					}}
				>
					Sao chép mã ID
				</button>
			</div>

			<span className="text-sm text-gray-400">{user.id}</span>
		</>
	);
};

export const AnhDaiDien = ({ user }: { user: User }) => {
	return (
		<>
			<div className="flex items-center justify-between py-2">
				<h3 className="text-xl">Ảnh đại diện</h3>

				<button>Thay đổi ảnh đại diện</button>
			</div>

			<Image src={user.profileImageUrl} alt="Ảnh đại diện của người dùng" width={36} height={36} className="rounded-full" />
		</>
	);
};

export const TenNguoiDung = ({ user }: { user: User }) => {
	return (
		<>
			<div className="flex items-center justify-between py-2">
				<h3 className="text-xl">Họ Tên</h3>

				<button>Thay đổi</button>
			</div>

			<span className="text-sm text-gray-400">{user.username}</span>
		</>
	);
};

export const EmailNguoiDung = ({ user }: { user: User }) => {
	const mainEmail = user.emailAddresses.filter((email) => email.id === user.primaryEmailAddressId)[0]!;

	return (
		<>
			<div className="flex items-center justify-between py-2">
				<h3 className="text-xl">Email</h3>

				<button>Thay đổi</button>
			</div>

			<div className="flex flex-col">{mainEmail.emailAddress}</div>
		</>
	);
};

export const BaoMat2Lop = ({}: { user: User }) => {
	return (
		<>
			<div className="flex items-center justify-between py-2">
				<h3 className="text-xl">Bảo mật 2 lớp</h3>

				<Switch />
			</div>

			<div className="flex flex-col">{}</div>
		</>
	);
};
