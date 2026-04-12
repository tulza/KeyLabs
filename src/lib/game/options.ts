import { Mode } from "./enum";

export const modeOptions: Record<Mode, number[]> = {
	[Mode.time]: [5, 15, 30, 60, 120],
	[Mode.characters]: [3, 30, 50, 100],
};
