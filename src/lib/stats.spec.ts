import { describe, expect, it } from "vitest";
import { max, mean, median, mode } from "./stats";

describe("mean", () => {
	it("returns average of a list", () => {
		expect(mean([1, 2, 3, 4, 5])).toBe(3);
	});
	it("rounds to 2 decimal places", () => {
		expect(mean([1, 2, 3])).toBe(2);
		expect(mean([1, 1, 2])).toBe(1.33);
	});
	it("handles a single value", () => {
		expect(mean([7])).toBe(7);
	});
});

describe("median", () => {
	it("returns middle value for odd-length list", () => {
		expect(median([1, 2, 3, 4, 5])).toBe(3);
	});
	it("returns average of two middle values for even-length list", () => {
		expect(median([1, 2, 3, 4])).toBe(2.5);
	});
	it("handles unsorted input", () => {
		expect(median([5, 1, 3])).toBe(3);
	});
	it("handles a single value", () => {
		expect(median([7])).toBe(7);
	});
});

describe("mode", () => {
	it("returns the most frequent value", () => {
		expect(mode([1, 2, 2, 3, 3, 3])).toBe(3);
	});
	it("returns one mode when there are multiple", () => {
		expect(mode([1, 1, 2, 2])).toBe(1);
	});
	it("handles a single value", () => {
		expect(mode([5])).toBe(5);
	});
});

describe("max", () => {
	it("returns the largest value", () => {
		expect(max([1, 2, 3, 4, 5])).toBe(5);
	});
	it("handles negative numbers", () => {
		expect(max([-3, -1, -2])).toBe(-1);
	});
	it("handles a single value", () => {
		expect(max([7])).toBe(7);
	});
});
