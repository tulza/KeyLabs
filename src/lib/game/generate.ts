import { shuffle } from "radash";
import { v4 as uuidv4 } from "uuid";
import { getWordSet, WordSetData } from "@/data/sets/word-set";
import { GameConfig } from "./types";

export const generateWordList = (config: GameConfig): WordSetData => {
	const wordSet = getWordSet(config.wordSet);
	const words = shuffle(wordSet.words);
	const gameHash = uuidv4();

	return { name: wordSet.name, words, hash: gameHash };
};

export const generateWordListAsync = (
	config: GameConfig,
): Promise<WordSetData> => {
	return new Promise((resolve) => {
		const wordSet = getWordSet(config.wordSet);

		const worker = new Worker(
			new URL("./generate.worker.ts", import.meta.url),
			{ type: "module" },
		);

		worker.onmessage = (e: MessageEvent<WordSetData>) => {
			worker.terminate();
			resolve(e.data);
		};

		worker.postMessage(wordSet);
	});
};
