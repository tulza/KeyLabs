import { describe, expect, it } from "vitest";
import { Point } from "./types";
import { distance, isTooClose } from "./utils";

describe("distance", () => {
	it("returns 0 for the same point", () => {
		expect(distance(0, 0, 0, 0)).toBe(0);
	});

	it("calculates horizontal distance", () => {
		expect(distance(0, 0, 3, 0)).toBe(3);
	});

	it("calculates vertical distance", () => {
		expect(distance(0, 0, 0, 4)).toBe(4);
	});

	it("calculates diagonal distance (3-4-5 triangle)", () => {
		expect(distance(0, 0, 3, 4)).toBe(5);
	});

	it("is the same regardless of direction", () => {
		expect(distance(0, 0, 3, 4)).toBe(distance(3, 4, 0, 0));
	});

	it("works with negative coordinates", () => {
		expect(distance(-3, 0, 0, 4)).toBe(5);
	});
});

const makePoint = (x: number, y: number): Point => ({
	index: 0,
	value: "a",
	x,
	y,
	id: `test-${x}-${y}`,
});

describe("isTooClose", () => {
	it("returns false for an empty stack", () => {
		expect(isTooClose([], 0, 0, 16, 2)).toBe(false);
	});

	it("returns true when a point is within the minimum distance", () => {
		const stack = [makePoint(0, 0)];
		// targetSize * multiplier = 16 * 2 = 32, distance here is 10
		expect(isTooClose(stack, 10, 0, 16, 2)).toBe(true);
	});

	it("returns false when a point is outside the minimum distance", () => {
		const stack = [makePoint(0, 0)];
		// targetSize * multiplier = 16 * 2 = 32, distance here is 50
		expect(isTooClose(stack, 50, 0, 16, 2)).toBe(false);
	});

	it("returns false when a point is exactly on the minimum distance boundary", () => {
		const stack = [makePoint(0, 0)];
		// targetSize * multiplier = 16 * 2 = 32, distance here is exactly 32
		expect(isTooClose(stack, 32, 0, 16, 2)).toBe(false);
	});

	it("returns true if any point in the stack is too close", () => {
		const stack = [makePoint(100, 100), makePoint(0, 0)];
		expect(isTooClose(stack, 10, 0, 16, 2)).toBe(true);
	});

	it("returns false when all points in the stack are far enough", () => {
		const stack = [makePoint(100, 100), makePoint(200, 200)];
		expect(isTooClose(stack, 0, 0, 16, 2)).toBe(false);
	});
});
