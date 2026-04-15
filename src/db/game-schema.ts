import { integer, pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { user } from "./auth-schema";

export const gameResults = pgTable("game_results", {
	id: integer("id").primaryKey(),
	userId: text("user_id")
		.notNull()
		.references(() => user.id, { onDelete: "cascade" }),
	// test type
	mode: text("mode").notNull(),
	mode2: integer("mode2").notNull(),
	wordSet: text("word_set").notNull(),
	targetSize: integer("target_size").notNull(),

	clicks: integer("clicks").notNull(),
	incorrect: integer("incorrect").notNull(),
	hits: integer("hits").notNull(),

	duration: integer("time").notNull(),
	startTime: timestamp("start_time").notNull(),
	createdAt: timestamp("created_at").defaultNow().notNull(),
});
