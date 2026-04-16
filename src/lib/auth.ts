import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { openAPI } from "better-auth/plugins";
import { tanstackStartCookies } from "better-auth/tanstack-start";
import { db } from "@/db"; // your drizzle instance

export const auth = betterAuth({
	baseURL: process.env.BETTER_AUTH_URL,
	basePath: "/api/auth",
	database: drizzleAdapter(db, {
		provider: "pg", // or "mysql", "sqlite"
	}),
	plugins: [openAPI(), tanstackStartCookies()],
	socialProviders: {
		github: {
			clientId: process.env.GITHUB_CLIENT_ID as string,
			clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
		},
		google: {
			prompt: "select_account",
			clientId: process.env.GOOGLE_CLIENT_ID as string,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
		},
	},
});
