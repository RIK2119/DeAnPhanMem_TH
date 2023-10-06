import { NextResponse } from "next/server";

import { env } from "@/env.mjs";
import { prisma } from "@/server/db/prisma";
import { convertClerkUserIdToUUID } from "@/utils/clerk";

import type { WebhookEvent } from "@clerk/clerk-sdk-node";
import { Webhook } from "svix";

export async function POST(request: Request) {
	const payload = (await request.json()) as WebhookEvent;
	const headers = Object.fromEntries(request.headers);

	const wh = new Webhook(env.CLERK_SIGNING_KEY);

	try {
		wh.verify(JSON.stringify(payload), headers);
	} catch (err) {
		return NextResponse.json({ error: new Error(err as string).message }, { status: 400 });
	}

	const { type, data } = payload;

	switch (type) {
		case "user.created": {
			const main_email = data.email_addresses.filter((email) => email.id === data.primary_email_address_id)[0]!;

			const user = await prisma.nguoiDung.create({
				data: {
					MaNguoiDung: convertClerkUserIdToUUID(data.id),
					AnhDaiDien: data.image_url,
					Email: main_email.email_address,
					GioiTinh: "Male",
					TenNguoiDung: data.username ?? data.last_name + data.first_name,
				},
			});

			return NextResponse.json({ ...user });
		}

		case "user.deleted": {
			const nguoiDungId = convertClerkUserIdToUUID(data.id as string);
			await prisma.nguoiDung.delete({ where: { MaNguoiDung: nguoiDungId } });

			return NextResponse.json({ message: "Delete user with id = " + nguoiDungId });
		}

		case "user.updated": {
			const main_email = data.email_addresses.filter((email) => email.id === data.primary_email_address_id)[0]!;

			const user = await prisma.nguoiDung.update({
				where: { MaNguoiDung: convertClerkUserIdToUUID(data.id) },
				data: {
					AnhDaiDien: data.image_url,
					Email: main_email.email_address,
					TenNguoiDung: data.username ?? data.last_name + data.first_name,
				},
			});

			return NextResponse.json({ ...user });
		}
	}
}
