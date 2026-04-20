import { type InferSelectModel } from "drizzle-orm";
import { createSelectSchema } from "drizzle-typebox";
import { userPersonalBests } from "@/db/game-schema";

export const TPersonalBestResult = createSelectSchema(userPersonalBests);
export type PersonalBestResult = InferSelectModel<typeof userPersonalBests>;
