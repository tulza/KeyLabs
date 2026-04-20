import { openapi } from "@elysiajs/openapi";
import { Elysia } from "elysia";
import { betterAuthPlugin, OpenAPI } from "@/server/better-auth";
import { leaderboard } from "@/server/leaderboard";
import { profile } from "@/server/profile";
import { result } from "@/server/result";
import { user } from "@/server/user";

export const app = new Elysia({
	prefix: "/api",
})
	.use(betterAuthPlugin)
	.use(
		openapi({
			documentation: {
				components: await OpenAPI.components,
				paths: await OpenAPI.getPaths(),
			},
		}),
	)
	.use(result)
	.use(profile)
	.use(leaderboard)
	.use(user);

export type App = typeof app;

export const GET = app.fetch;
export const POST = app.fetch;
