import { type InferSelectModel } from "drizzle-orm";
import { createInsertSchema } from "drizzle-typebox";
import { gameResults } from "@/db/game-schema";

export type GameResult = InferSelectModel<typeof gameResults>;

export const gameResultInsertSchema = createInsertSchema(gameResults);
export type GameResultInsert = typeof gameResultInsertSchema.static;
