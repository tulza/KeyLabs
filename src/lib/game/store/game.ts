import { create } from "zustand";
import { useShallow } from "zustand/react/shallow";
import { WordSetData } from "@/data/sets/word-set";
import { GameConfig, GameStateData, Statistic } from "../types";

type GameStateStore = {
	readonly config: GameConfig | null;
	readonly set: WordSetData | null;
	stats: Statistic;
	charIndex: number;
	wordIndex: number;
	actions: {
		init: (data: GameStateData) => void;
		setStats: (stats: Statistic) => void;
		setCharIndex: (index: number) => void;
		setWordIndex: (index: number) => void;
		reset: () => void;
	};
};

const initialState = {
	config: null,
	set: null,
	stats: { clicks: 0, hits: 0, time: 0 },
	charIndex: 0,
	wordIndex: 0,
};

export const useGameStateStore = create<GameStateStore>((set) => ({
	...initialState,
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
		setCharIndex: (charIndex) => set({ charIndex }),
		setWordIndex: (wordIndex) => set({ wordIndex }),
		reset: () => set(initialState),
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
