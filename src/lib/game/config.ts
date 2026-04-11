import { Mode, WordSet } from "./enum";
import { modeOptions } from "./options";
import { Screen } from "./types";

const GRIDSIZE = 60;
const defaultTargetSize = 64;

export const screen: Screen = { width: 15 * GRIDSIZE, height: 9 * GRIDSIZE };

export const defaultConfig = {
	mode: Mode.time,
	mode2: modeOptions[Mode.time][0],
	wordSet: WordSet.english,
	targetSize: defaultTargetSize,
};
