import { User } from "better-auth";
import { sql } from "drizzle-orm";
import { db } from "@/db";
import { userPersonalBests } from "@/db/game-schema";
import { deriveAnalysis } from "@/lib/game/utils";
import { GameResult } from "../types/game-result";

export const checkAndUpdatePersonalBest = async (
	user: User,
	result: GameResult,
) => {
	const { mode, mode2, wordSet, targetSize, id } = result;
	const { accuracy, lpm } = deriveAnalysis(result, result.duration);
	const { id: userId } = user;

	const pb = await db
		.insert(userPersonalBests)
		.values({
			userId,
			gameId: id,
			mode,
			mode2,
			wordSet,
			targetSize,
			lpm,
			accuracy,
		})
		.onConflictDoUpdate({
			target: [
				userPersonalBests.userId,
				userPersonalBests.mode,
				userPersonalBests.mode2,
				userPersonalBests.wordSet,
			],
			set: {
				gameId: result.id,
				lpm,
				accuracy,
				updatedAt: new Date(),
			},
			where: sql`excluded.lpm > ${userPersonalBests.lpm}`,
		})
		.returning();

	if (pb.length === 0) {
		return { isNewPB: false, pb: null };
	}

	return { isNewPB: true, pb: pb[0] };
};
