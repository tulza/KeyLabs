import objectHash from "object-hash";
import { Mode, WordSet } from "@/lib/game/enum";
import { EndGameResult } from "@/lib/game/types";

export const createMockEndGameResult = (
	overrides: Partial<EndGameResult> = {},
): EndGameResult => {
	const now = Date.now();
	const duration = 60000;
	const startTime = now - duration;

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
	};

	const baseHash = objectHash({ config, result, startTime });

	const analysis = {
		accuracy: 0.95,
		lpm: 90.25,
		rawLpm: 95,
	};

	const defaultResult: EndGameResult = {
		config,
		result,
		startTime: startTime,
		duration: duration,
		hash: baseHash,
		analysis: analysis,
		...overrides,
	};

	return defaultResult;
};
