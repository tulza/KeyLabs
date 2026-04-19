"use server";

import { readdir, readFile } from "fs/promises";
import path from "path";
import { WordSet } from "@/lib/game/enum";
import { WordSetData } from "@/lib/game/types";
import { getOrderForLanguage } from "./languages";

export type WordSetMeta = Pick<WordSetData, "name" | "description">;

const wordsetDir = path.join(process.cwd(), "src/data/sets");

// cache available sets
let cachedList: string[] | null = null;

/**
 * Get all available wordsets (file-based)
 */
export const getAvailableWordsets = async (): Promise<string[]> => {
	if (cachedList) return cachedList;

	const files = await readdir(wordsetDir);

	cachedList = files
		.filter((file) => file.endsWith(".json"))
		.map((file) => file.replace(".json", ""))
		.sort(getOrderForLanguage);

	return cachedList;
};

/**
 * Load a wordset safely from disk
 */
export const getWordSet = async (wordSetName: string): Promise<WordSetData> => {
	const safeName = wordSetName ?? WordSet.english;

	try {
		const raw = await readFile(
			path.join(wordsetDir, `${safeName}.json`),
			"utf-8",
		);

		return JSON.parse(raw) as WordSetData;
	} catch {
		const fallback = await readFile(
			path.join(wordsetDir, `${WordSet.english}.json`),
			"utf-8",
		);

		return JSON.parse(fallback) as WordSetData;
	}
};

/**
 * Metadata list (lightweight)
 */
export const getWordSetSelection = async () => {
	const names = await getAvailableWordsets();

	return names.map((name) => ({
		name,
		description: undefined,
	}));
};
