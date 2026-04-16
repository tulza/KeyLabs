import Elysia from "elysia";
import { rateLimit } from "elysia-rate-limit";
import { db } from "@/db";
import { gameResults } from "@/db/game-schema";
import { auth } from "@/lib/auth";
import { TEndGameResult } from "@/lib/game/types";
import { betterAuthPlugin } from "./better-auth";
import { summaryMapper } from "./service/mapper";
import { runValidation } from "./service/validate";

export const result = new Elysia({ name: "result" }).group("/result", (app) =>
	app
		.use(betterAuthPlugin)
		.use(
			rateLimit({
				scoping: "scoped",
				duration: 5 * 1000,
				max: 1,
				generator: async (req) => {
					const session = await auth.api.getSession({
						headers: req.headers,
					});
					return session!.user.id;
				},
				errorResponse: new Response("too_many_requests", {
					headers: {
						"Content-Type": "text/plain",
					},
					status: 429,
				}),
			}),
		)
		.trace(async ({ onHandle }) => {
			onHandle(({ begin, onStop }) => {
				onStop(({ end }) => {
					console.log("handle took", end - begin, "ms");
				});
			});
		})
		.post(
			"/",
			async ({ body, user, status }) => {
				const { success, error } = runValidation(body);

				if (!success) {
					return status(400, error);
				}

				const result = summaryMapper(body, user);
				await db.insert(gameResults).values(result);

				return status(201, "game_result_created");
			},
			{ body: TEndGameResult, auth: true },
		),
);
