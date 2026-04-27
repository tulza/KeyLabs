import Elysia, { Static, t } from "elysia";
import { db } from "@/db";
import { betterAuthPlugin } from "./better-auth";
import { TPersonalBestResult } from "./types/personal-best";

export const TLeaderboardBody = t.Object({
	mode: t.String(),
	mode2: t.Number(),
	wordset: t.String(),
});

export const TLeaderboardUser = t.Object({
	id: t.String(),
	handle: t.String(),
});

export const TLeaderboardListResponse = t.Array(
	t.Composite([
		TPersonalBestResult,
		t.Object({ user: t.Nullable(TLeaderboardUser) }),
	]),
);

export type LeaderboardListResponse = Static<typeof TLeaderboardListResponse>;

export const leaderboard = new Elysia({ name: "leaderboard" }).group(
	"/leaderboard",
	(app) =>
		app.use(betterAuthPlugin).post(
			"/",
			async ({ body, status }) => {
				const bestScores = await db.query.userPersonalBests
					.findMany({
						where: (pb, { eq, and, isNotNull }) =>
							and(
								eq(pb.mode, body.mode),
								eq(pb.mode2, body.mode2),
								body.wordset === "any"
									? undefined
									: eq(pb.wordSet, body.wordset),
							),
						orderBy: (pb, { desc }) => desc(pb.lpm),
						with: {
							user: {
								columns: { id: true, handle: true },
							},
						},
						limit: 25,
					})
					// todo: fix this mess lol
					.then((results) =>
						results.filter(
							(
								r,
							): r is typeof r & {
								user: { id: string; handle: string };
							} => r.user?.handle != null,
						),
					);

				return status(200, bestScores);
			},
			{
				body: TLeaderboardBody,
				optionalAuth: true,
				response: TLeaderboardListResponse,
			},
		),
);
