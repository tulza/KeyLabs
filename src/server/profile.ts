import { Array } from "@sinclair/typebox";
import Elysia from "elysia";
import { db } from "@/db";
import { Mode } from "@/lib/game/enum";
import { betterAuthPlugin } from "./better-auth";
import { pbAllowedCharacters, pbAllowedTimes } from "./data/pb-allowed";
import { UserPersonalBestScoreSchema } from "./types/game-result";

export const profile = new Elysia({ name: "profile" }).group(
	"/profile",
	(app) =>
		app.use(betterAuthPlugin).get(
			"/",
			async ({ user, status }) => {
				const personalBests = await db.query.userPersonalBests.findMany(
					{
						where: (pb, { eq, and, inArray, or }) =>
							and(
								eq(pb.userId, user.id),
								or(
									and(
										eq(pb.mode, Mode.time),
										inArray(pb.mode2, pbAllowedTimes),
									),
									and(
										eq(pb.mode, Mode.characters),
										inArray(pb.mode2, pbAllowedCharacters),
									),
								),
							),
					},
				);

				return status(200, personalBests);
			},
			{ response: Array(UserPersonalBestScoreSchema), auth: true },
		),
);
