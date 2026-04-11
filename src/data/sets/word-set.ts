import { WordSet } from "@/lib/game/enum";

export type WordSetData = {
	name: string;
	words: string[];
};

const modules = import.meta.glob<{ default: WordSetData }>("./*.json", {
	eager: true,
});

const sets = Object.fromEntries(
	Object.entries(modules).map(([path, module]) => {
		const name = path.match(/\/(\w+)\.json$/)?.[1] as WordSet;
		return [name, module.default];
	}),
) as Record<WordSet, WordSetData>;

export const getWordSet = (setName: WordSet): WordSetData => {
	return sets[setName] ?? sets[WordSet.english];
};
