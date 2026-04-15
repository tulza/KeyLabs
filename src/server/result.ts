import Elysia, { status } from "elysia";
import { TEndGameResult } from "@/lib/game/types";
import { betterAuthPlugin } from "./better-auth";
import { validateGameResult } from "./service/validate";

export const result = new Elysia({ name: "result" }).group("/result", (app) =>
	app.use(betterAuthPlugin).post(
		"/",
		async ({ body, user }) => {
			if (!user) {
				return status(401, "Please login to continue");
			}

			const isValidGame = validateGameResult(body);

			if (!isValidGame) {
				return status(400, "Invalid game result");
			}

			return status(201, body);
		},
		{ body: TEndGameResult, auth: true },
	),
);
