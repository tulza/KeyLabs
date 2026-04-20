import Elysia from "elysia";
import { rateLimit } from "elysia-rate-limit";
import { db } from "@/db";
import { gameResults } from "@/db/game-schema";
import { auth } from "@/lib/auth";
import { TEndGameResult } from "@/lib/game/types";
import { betterAuthPlugin } from "./better-auth";
import { allowedMode2 } from "./data/pb-allowed";
import { summaryMapper } from "./service/mapper";
import { checkAndUpdatePersonalBest } from "./service/personal-best";
import { runValidation } from "./service/result.utils";

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
					return status(400, { error });
				}

				const { mode, mode2 } = body.config;

				if (allowedMode2[mode].includes(mode2))
					return status(400, "not an eligible mode2");

				const result = summaryMapper(body, user);

				const [gameResult] = await db
					.insert(gameResults)
					.values(result)
					.returning();

				if (!gameResult)
					return status(400, { error: "no game result returned" });

				const { isNewPB } = await checkAndUpdatePersonalBest(
					user,
					gameResult,
				);

				return status(201, { pb: isNewPB });
			},
			{ body: TEndGameResult, auth: true },
		),
);
