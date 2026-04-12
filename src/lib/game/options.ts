import { Mode } from "./enum";

export const modeOptions: Record<Mode, number[]> = {
	[Mode.time]: [15, 30, 60, 120],
	[Mode.characters]: [30, 50, 100],
};
