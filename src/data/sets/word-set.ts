import { WordSet } from "@/lib/game/enum";

export type WordSetData = {
	name: string;
	description?: string;
	words: string[];
};

export const defaultWordSet: WordSetData = {
	name: WordSet.english,
	words: [],
};

export type WordSetMeta = Pick<WordSetData, "name" | "description">;

const modules = import.meta.glob<{ default: WordSetData }>("./*.json", {
	eager: true,
});

const sets = Object.fromEntries(
	Object.entries(modules).map(([path, module]) => {
		const name = path.match(/\/(\w+)\.json$/)?.[1] as WordSet;
		return [name, module.default];
	}),
) as Record<WordSet, WordSetData>;

export const setMeta = Object.entries(sets).map(
	([_, { name, description }]) =>
		({ name, description }) satisfies WordSetMeta,
) as WordSetMeta[];

export const getWordSet = (setName: WordSet): WordSetData => {
	return sets[setName] ?? sets[WordSet.english];
};
