import { create } from "zustand";
import { useShallow } from "zustand/react/shallow";
import { defaultWordSet, WordSetData } from "@/data/sets/word-set";
import { defaultConfig } from "../config";
import { GameConfig, GameStateData, Statistic } from "../types";
import { setNewWord } from "./point";
import { usePreGameStore } from "./pre-game";

// this is the game state used during the playing of the game.
// it used when actively playing the game

type GameStateStore = {
	// config and set are initialized/reset when state switches from resetting to ready
	readonly config: GameConfig;
	readonly set: WordSetData;
	// active game state
	stats: Statistic;
	charIndex: number;
	wordIndex: number;
	actions: {
		init: (data: GameStateData) => void;
		setStats: (stats: Statistic) => void;
		handleClick: () => void;
		handleHit: () => void;
		resetToDefault: () => void;
		reset: () => void;
	};
};

const initialGame = {
	stats: { clicks: 0, hits: 0, time: 0 },
	charIndex: 0,
	wordIndex: 0,
};

const defaultState = {
	config: defaultConfig,
	set: defaultWordSet,
	...initialGame,
};

export const useGameStateStore = create<GameStateStore>((set) => ({
	...defaultState,
	actions: {
		init: (data) =>
			set({
				config: data.config,
				set: data.set,
				stats: data.stats,
				charIndex: data.charIndex,
				wordIndex: data.wordIndex,
			}),
		setStats: (stats) => set({ stats }),
		handleClick: () => {
			set((prevs) => {
				const newStats = {
					...prevs.stats,
					clicks: prevs.stats.clicks + 1,
				};
				return {
					stats: newStats,
				};
			});
		},
		handleHit: () => {
			const {
				charIndex,
				wordIndex,
				set: wordSet,
				stats,
			} = getGameStateStore();
			const { charIndex: nextci, wordIndex: nextwi } = increment(
				charIndex,
				wordIndex,
				wordSet.words,
			);

			if (isNewWord(nextci, nextwi)) {
				setNewWord(wordSet.words[nextwi]);
			}

			set({
				charIndex: nextci,
				wordIndex: nextwi,
				stats: {
					...stats,
					clicks: stats.clicks + 1,
					hits: stats.hits + 1,
				},
			});
		},

		// default state
		resetToDefault: () => set(defaultState),
		// preconfig state going from resetting to ready
		reset: () => {
			const config = usePreGameStore.getState().config;
			set({ ...initialGame, config });
		},
	},
}));

// Selectors
export const useGameConfig = () => useGameStateStore((s) => s.config);
export const useGameSet = () => useGameStateStore((s) => s.set);
export const useGameStats = () => useGameStateStore(useShallow((s) => s.stats));
export const useWordIndex = () =>
	useGameStateStore(
		useShallow((s) => ({ charIndex: s.charIndex, wordIndex: s.wordIndex })),
	);
export const useGameStateActions = () => useGameStateStore((s) => s.actions);

export const getGameStateStore = () => {
	return useGameStateStore.getState();
};

export const increment = (
	charIndex: number,
	wordIndex: number,
	words: string[],
) => {
	const currentWordLength = words[wordIndex].length;

	// next char
	if (charIndex < currentWordLength - 1) {
		return { charIndex: charIndex + 1, wordIndex, finished: false };
	}

	// next word
	if (wordIndex < words.length - 1) {
		return { charIndex: 0, wordIndex: wordIndex + 1, finished: false };
	}

	// end of list
	return { charIndex: 0, wordIndex: 0, finished: true };
};

const isNewWord = (charIndex: number, wordIndex: number) =>
	charIndex === 0 && wordIndex > 0;
