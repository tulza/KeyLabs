import { shuffle } from "radash";
import { WordSetData } from "@/data/sets/word-set";

self.onmessage = (e: MessageEvent<WordSetData>) => {
	const result: WordSetData = {
		name: e.data.name,
		words: shuffle(e.data.words),
	};
	self.postMessage(result);
};
