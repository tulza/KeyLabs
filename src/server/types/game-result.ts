import { type InferSelectModel } from "drizzle-orm";
import { createInsertSchema, createSelectSchema } from "drizzle-typebox";
import { gameResults, userPersonalBests } from "@/db/game-schema";

export type GameResult = InferSelectModel<typeof gameResults>;

export const gameResultInsertSchema = createInsertSchema(gameResults);
export type GameResultInsert = typeof gameResultInsertSchema.static;

export const UserPersonalBestScoreSchema =
	createSelectSchema(userPersonalBests);
export type UserPersonalBestScore = typeof UserPersonalBestScoreSchema.static;
