import { getWordSet } from "@/data/sets/word-set";
import { GameConfig, WordSetData } from "./types";

export const generateWordListAsync = (
	config: GameConfig,
): Promise<WordSetData> => {
	return new Promise(async (resolve) => {
		const wordSet = await getWordSet(config.wordSet);

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
