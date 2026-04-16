import objectHash from "object-hash";
import { Mode, WordSet } from "@/lib/game/enum";
import { EndGameResult } from "@/lib/game/types";

export const createMockEndGameResult = (
	overrides: Partial<EndGameResult> = {},
): EndGameResult => {
	const now = Date.now();
	const config = {
		mode: Mode.time,
		mode2: 60,
		wordSet: WordSet.test,
		targetSize: 20,
	};
	const result = {
		clicks: 100,
		incorrect: 5,
		hits: 95,
		time: 60000,
	};
	const baseHash = objectHash({ config, result });

	const analysis = {
		accuracy: 0.95,
		lpm: 90.25,
		rawLpm: 95,
	};

	const defaultResult: EndGameResult = {
		config,
		result,
		startTime: now - 60000,
		duration: 60000,
		hash: baseHash,
		analysis: analysis,
		...overrides,
	};

	return defaultResult;
};
