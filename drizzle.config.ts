import type { Config } from "drizzle-kit";

export default {
	schema: "./src/server/db/schema/*",
	out: "./drizzle",
	driver: "mysql2",
	dbCredentials: {
		connectionString:
			'mysql://bs17dintpro4yic3jl8i:pscale_pw_9C1Da8xmp3WgodoajCBmhy0adgopsgfVOG0bpt6MUCe@aws.connect.psdb.cloud/congnghephanmemdatabase?ssl={"rejectUnauthorized":true}',
	},
} satisfies Config;
