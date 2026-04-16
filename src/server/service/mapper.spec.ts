import { describe, expect, it } from "vitest";
import { summaryMapper } from "./mapper";
import { createMockEndGameResult } from "./mock";

describe("summaryMapper", () => {
	it("should work", () => {
		const result = createMockEndGameResult();
		expect(summaryMapper(result, { id: "123" })).toBeDefined();
	});
});
