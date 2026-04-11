import { shuffle } from "radash";
import { getWordSet, WordSetData } from "@/data/sets/word-set";
import { GameConfig } from "./types";

export const generateWordList = (config: GameConfig): WordSetData => {
	const wordSet = getWordSet(config.wordSet);
	const words = shuffle(wordSet.words);

	return { name: wordSet.name, words };
};
