import { openapi } from "@elysiajs/openapi";
import { createFileRoute } from "@tanstack/react-router";
import { Elysia } from "elysia";
import { betterAuthPlugin, OpenAPI } from "@/server/better-auth";
import { result } from "@/server/result";
import { user } from "@/server/user";

const app = new Elysia({
	prefix: "/api",
})
	.use(
		openapi({
			documentation: {
				components: await OpenAPI.components,
				paths: await OpenAPI.getPaths(),
			},
		}),
	)
	.use(betterAuthPlugin)
	.use(result)
	.use(user);

const handle = ({ request }: { request: Request }) => app.fetch(request);

export const Route = createFileRoute("/api/$")({
	server: {
		handlers: {
			GET: handle,
			POST: handle,
		},
	},
});

export default app.fetch;
export type App = typeof app;
