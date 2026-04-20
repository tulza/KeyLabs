import { Mode } from "@/lib/game/enum";

export const pbAllowedTimes = [15, 30, 60, 120];
export const pbAllowedCharacters = [30, 50, 100, 200];

export const allowedMode2: Record<Mode, number[]> = {
	[Mode.time]: pbAllowedTimes,
	[Mode.characters]: pbAllowedCharacters,
};
