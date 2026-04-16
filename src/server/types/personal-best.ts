import { type InferSelectModel } from "drizzle-orm";
import { userPersonalBests } from "@/db/game-schema";

export type PersonalBestResult = InferSelectModel<typeof userPersonalBests>;
