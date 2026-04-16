import { describe, expect, it } from "vitest";
import { createMockEndGameResult } from "./mock";
import {
	runValidation,
	validateAnalysis,
	validateHash,
	validateTime,
} from "./validate";

describe("validateGameResult", () => {
	it("should return true for valid game result", () => {
		const result = createMockEndGameResult();
		expect(runValidation(result, true).success).toBe(true);
	});

	it("should return false for invalid hash", () => {
		const result = createMockEndGameResult({ hash: "invalid-hash" });
		expect(runValidation(result, true).success).toBe(false);
	});

	it("should return false for invalid startTime/duration", () => {
		const result = createMockEndGameResult({
			startTime: Date.now() - 100000,
			duration: 1000,
		});
		expect(runValidation(result, true).success).toBe(false);
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

describe("validateAnalysis", () => {
	it("should return true for valid time", () => {
		const result = createMockEndGameResult();
		expect(validateAnalysis(result)).toBe(true);
	});
});
