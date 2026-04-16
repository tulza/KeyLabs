import {
	integer,
	pgTable,
	smallint,
	text,
	timestamp,
} from "drizzle-orm/pg-core";
import { user } from "./auth-schema";

export const gameResults = pgTable("game_results", {
	id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
	userId: text("user_id")
		.notNull()
		.references(() => user.id, { onDelete: "cascade" }),
	// test type
	mode: text("mode").notNull(),
	mode2: smallint("mode2").notNull(),
	wordSet: text("word_set").notNull(),
	targetSize: smallint("target_size").notNull(),

	clicks: smallint("clicks").notNull(),
	incorrect: smallint("incorrect").notNull(),
	hits: smallint("hits").notNull(),

	score: integer("score").default(0).notNull(),
	startTime: timestamp("start_time").notNull(),
	createdAt: timestamp("created_at").defaultNow().notNull(),
});
