import { Value } from "@sinclair/typebox/value";
import { EndGameResult } from "@/lib/game/types";
import { GameResultInsert, gameResultInsertSchema } from "../types/game-result";

export const summaryMapper = (
	result: EndGameResult,
	user: { id: string },
): GameResultInsert => {
	const data = {
		userId: user.id,

		mode: result.config.mode,
		mode2: result.config.mode2,
		wordSet: result.config.wordSet,
		targetSize: result.config.targetSize,

		clicks: result.result.clicks,
		incorrect: result.result.incorrect,
		hits: result.result.hits,

		duration: result.duration,
		startTime: new Date(result.startTime),
	};

	if (!Value.Check(gameResultInsertSchema, data)) {
		const errors = [...Value.Errors(gameResultInsertSchema, data)];
		console.error("Mapping validation failed:", errors);
		throw new Error("Invalid game summary data");
	}

	return data;
};
