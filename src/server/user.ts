import Elysia from "elysia";
import { betterAuthPlugin } from "./better-auth";

export const user = new Elysia({ name: "user" }).group("/user", (app) =>
	app.use(betterAuthPlugin).get("/", ({ user }) => user, {
		auth: true,
	}),
);
