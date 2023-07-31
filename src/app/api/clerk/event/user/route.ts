import { NextResponse } from "next/server";

import { db } from "@/server/db/client";
import { NguoiDungTable } from "@/server/db/schema/nguoiDung";
import { convertClerkUserIdToUUID } from "@/utils/clerk";

import { Webhook } from "svix";
import type { WebhookEvent } from "@clerk/clerk-sdk-node";
import { eq, type InferModel } from "drizzle-orm";
import { env } from "@/env.mjs";

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

			const user: InferModel<typeof NguoiDungTable, "insert"> = {
				maNguoiDung: convertClerkUserIdToUUID(data.id),
				gioiTinh: true,
				anhDaiDien: data.image_url,
				ngaySinh: new Date(),
				email: main_email.email_address,
				tenNguoiDung: data.username ?? (main_email.email_address.split("@")[0] as string),
			};

			await db.insert(NguoiDungTable).values(user);
			break;
		}

		case "user.deleted": {
			const nguoiDungId = convertClerkUserIdToUUID(data.id as string);
			await db.delete(NguoiDungTable).where(eq(NguoiDungTable.maNguoiDung, nguoiDungId));

			break;
		}

		case "user.updated": {
			const main_email = data.email_addresses.filter((email) => email.id === data.primary_email_address_id)[0]!;

			const user: InferModel<typeof NguoiDungTable, "insert"> = {
				maNguoiDung: convertClerkUserIdToUUID(data.id),
				gioiTinh: true,
				anhDaiDien: data.image_url,
				ngaySinh: new Date(),
				email: main_email.email_address,
				tenNguoiDung: data.username ?? (main_email.email_address.split("@")[0] as string),
			};

			await db.update(NguoiDungTable).set(user).where(eq(NguoiDungTable.maNguoiDung, user.maNguoiDung));

			break;
		}
	}

	return NextResponse.json({ success: true });
}
