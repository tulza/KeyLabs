import { shuffle } from "radash";
import { getWordSet, WordSetData } from "@/data/sets/word-set";
import { WordSet } from "./enum";

export const generateWords = (setName: WordSet): WordSetData => {
	const wordSet = getWordSet(setName);
	const words = shuffle(wordSet.words);

	return { name: wordSet.name, words };
};
