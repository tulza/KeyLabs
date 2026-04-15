import objectHash from "object-hash";
import { describe, expect, it } from "vitest";
import { Mode, WordSet } from "@/lib/game/enum";
import { EndGameResult } from "@/lib/game/types";
import { validateGameResult, validateHash, validateTime } from "./validate";

const createMockEndGameResult = (
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

	const defaultResult: EndGameResult = {
		config,
		result,
		startTime: now - 60000,
		duration: 60000,
		hash: baseHash,
		...overrides,
	};

	return defaultResult;
};

describe("validateGameResult", () => {
	it("should return true for valid game result", () => {
		const result = createMockEndGameResult();
		expect(validateGameResult(result)).toBe(true);
	});

	it("should return false for invalid hash", () => {
		const result = createMockEndGameResult({ hash: "invalid-hash" });
		expect(validateGameResult(result)).toBe(false);
	});

	it("should return false for invalid startTime/duration", () => {
		const result = createMockEndGameResult({
			startTime: Date.now() - 100000,
			duration: 1000,
		});
		expect(validateGameResult(result)).toBe(false);
	});
});

describe("validateHash", () => {
	it("should return true for valid hash", () => {
		const result = createMockEndGameResult();
		expect(validateHash(result)).toBe(true);
	});

	it("should return false for invalid hash", () => {
		const result = createMockEndGameResult({ hash: "wrong-hash" });
		expect(validateHash(result)).toBe(false);
	});
});

describe("validateTime", () => {
	it("should return true for valid time", () => {
		const result = createMockEndGameResult();
		expect(validateTime(result)).toBe(true);
	});

	it("should return false for future finish time", () => {
		const result = createMockEndGameResult({
			startTime: Date.now() + 10000,
			duration: 1000,
		});
		expect(validateTime(result)).toBe(false);
	});

	it("should return false for too old finish time", () => {
		const result = createMockEndGameResult({
			startTime: Date.now() - 6000,
			duration: 100,
		});
		expect(validateTime(result)).toBe(false);
	});
});
