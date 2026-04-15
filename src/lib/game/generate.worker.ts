import { shuffle } from "radash";
import { v4 as uuidv4 } from "uuid";
import { WordSetData } from "@/data/sets/word-set";

self.onmessage = (e: MessageEvent<WordSetData>) => {
	const gameHash = uuidv4();

	const result: WordSetData = {
		name: e.data.name,
		words: shuffle(e.data.words),
		hash: gameHash,
	};
	self.postMessage(result);
};
