import { openapi } from "@elysiajs/openapi";
import { createFileRoute } from "@tanstack/react-router";
import { Elysia } from "elysia";
import { betterAuthPlugin, OpenAPI } from "@/server/better-auth";

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
	.get("/", "Hello Elysia!")
	.get(
		"/user",
		({ session, user }) => {
			return JSON.stringify({ session, user });
		},
		{
			auth: true,
		},
	)
	.listen(3000);

const handle = ({ request }: { request: Request }) => app.fetch(request);

export const Route = createFileRoute("/api/$")({
	server: {
		handlers: {
			GET: handle,
			POST: handle,
		},
	},
});
