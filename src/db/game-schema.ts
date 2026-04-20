import { relations } from "drizzle-orm";
import {
	integer,
	pgTable,
	primaryKey,
	real,
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
	mode2: real("mode2").notNull(),
	wordSet: text("word_set").notNull(),
	targetSize: real("target_size").notNull(),

	clicks: smallint("clicks").notNull(),
	incorrect: smallint("incorrect").notNull(),
	hits: smallint("hits").notNull(),

	duration: real("duration").notNull(),
	startTime: timestamp("start_time").notNull(),
	createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const userPersonalBests = pgTable(
	"user_personal_bests",
	{
		userId: text("user_id")
			.notNull()
			.references(() => user.id, { onDelete: "cascade" }),
		gameId: integer("game_id")
			.notNull()
			.references(() => gameResults.id, { onDelete: "cascade" }),
		// test type
		mode: text("mode").notNull(),
		mode2: real("mode2").notNull(),
		wordSet: text("word_set").notNull(),
		targetSize: real("target_size").notNull(),
		lpm: real("lpm").notNull(),
		accuracy: real("accuracy").notNull(),
		score: real("score").default(0).notNull(),
		updatedAt: timestamp("updated_at").defaultNow().notNull(),
	},
	(table) => [
		primaryKey({
			columns: [table.userId, table.mode, table.mode2, table.wordSet],
			name: "user_pb_pk",
		}),
	],
);

export const userPersonalBestsRelations = relations(
	userPersonalBests,
	({ one }) => ({
		user: one(user, {
			fields: [userPersonalBests.userId],
			references: [user.id],
		}),
	}),
);
