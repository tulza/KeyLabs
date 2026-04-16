import objectHash from "object-hash";
import { Mode } from "@/lib/game/enum";
import { EndGameResult, VEndGameResult } from "@/lib/game/types";
import { deriveAnalysis } from "@/lib/game/utils";

type ValidationResult = { success: boolean; error?: string };

export const runValidation = (
	body: EndGameResult,
	debug = false,
): ValidationResult => {
	const obfuscatedChecks: Array<[string, (b: EndGameResult) => boolean]> = [
		["schema", (b) => VEndGameResult.Check(b)],
		["hash", validateHash],
		["time", validateTime],
		["target", validateTarget],
		["mode", validateModeCompletion],
		["analysis", validateAnalysis],
	];

	const normalChecks: Array<[string, (b: EndGameResult) => boolean]> = [
		["game_too_short", validateTimedMode],
		["too_little_characters", validateCharacterMode],
	];

	if (process.env.DISABLE_ANTICHEAT === "true") {
		return { success: true };
	}

	// obfuscated checks
	for (const [name, fn] of obfuscatedChecks) {
		const ok = fn(body);

		if (!ok) {
			return process.env.API_DEBUGGING === "true"
				? { success: false, error: name }
				: { success: false, error: "invalid_game_result" };
		}
	}

	for (const [name, fn] of normalChecks) {
		const ok = fn(body);

		if (!ok) return { success: false, error: name };
	}

	return { success: true };
};

type Validator = (body: EndGameResult) => boolean;

export const validateHash: Validator = (body) => {
	const { config, result, startTime, hash } = body;
	const gameHash = objectHash({ config, result, startTime });

	return hash === gameHash;
};

export const validateTime: Validator = (body) => {
	const { startTime, duration } = body;

	const currentTime = Date.now();
	const calculatedFinishTime = startTime + duration;

	const timeDelta = currentTime - calculatedFinishTime;

	// allow slight client/server drift
	const isValid = timeDelta > -1000 && timeDelta < 5000;

	return isValid;
};

export const validateTarget: Validator = (body) => {
	const { result } = body;
	const { clicks, hits, incorrect } = result;

	const sum = hits + incorrect;

	if (sum > clicks) {
		return false;
	}

	return true;
};

export const validateAnalysis: Validator = (body) => {
	const { result, duration, analysis } = body;
	const { accuracy, lpm, rawLpm } = deriveAnalysis(result, duration);

	const isValid =
		inThreshold(analysis.accuracy, accuracy, 5) &&
		inThreshold(analysis.lpm, lpm, 5) &&
		inThreshold(analysis.rawLpm, rawLpm, 5);

	return isValid;
};

export const validateModeCompletion: Validator = (body) => {
	const { result, config, duration } = body;
	const { hits } = result;
	const { mode, mode2 } = config;

	if (mode === Mode.characters) {
		const isValid = mode2 === hits;
		return isValid;
	}

	if (config.mode === Mode.time) {
		const thresholdMs = 200;
		const expectedDuation = mode2 * 1000;

		return inThreshold(duration, expectedDuation, thresholdMs);
	}

	console.log("unhandled mode");
	return true;
};

export const validateTimedMode: Validator = (body) => {
	const { config } = body;
	const { mode, mode2 } = config;

	if (mode !== Mode.time) return true;
	if (mode2 < 15) return false;

	return true;
};

export const validateCharacterMode: Validator = (body) => {
	const { config } = body;
	const { mode, mode2 } = config;

	if (mode !== Mode.characters) return true;
	if (mode2 < 15) return false;

	return true;
};

const inThreshold = (a: number, b: number, threshold: number) => {
	return Math.abs(a - b) < threshold;
};
