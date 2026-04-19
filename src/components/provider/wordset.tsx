"use client";

import { createContext, useContext } from "react";
import { WordSetMeta } from "@/data/sets/word-set";

type WordSetContextValue = {
	wordSets: WordSetMeta[];
};

const WordSetContext = createContext<WordSetContextValue | null>(null);

export const WordSetProvider = ({
	children,
	value,
}: {
	children: React.ReactNode;
	value: WordSetMeta[];
}) => {
	return (
		<WordSetContext.Provider value={{ wordSets: value }}>
			{children}
		</WordSetContext.Provider>
	);
};

export const useWordSets = () => {
	const ctx = useContext(WordSetContext);

	if (!ctx) {
		throw new Error("useWordSets must be used within WordSetProvider");
	}

	return ctx.wordSets;
};
