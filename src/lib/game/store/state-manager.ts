import { create } from "zustand";
import { Mode, State } from "@/lib/game/enum";
import { deriveAnalysis } from "../utils";
import { getGameStateStore, initialStats, useGameStateStore } from "./game";
import { setNewWord } from "./point";
import { getPreGameStore, resetWordList, usePreGameStore } from "./pre-game";
import { getSummaryStore } from "./summary";

type GameFlowStore = {
	state: State;
	actions: {
		setState: (state: State) => void;
	};
};

export const useFlowStore = create<GameFlowStore>((set) => ({
	state: State.Resetting,
	actions: {
		setState: (state) => {
			console.log(state);
			set({ state });
		},
	},
}));

export const useGameState = () => useFlowStore((s) => s.state);
export const useGameActions = () => useFlowStore((s) => s.actions);

const allowed: Readonly<Partial<Record<State, State[]>>> = {
	[State.Resetting]: [State.Ready],
	// can reset at any time
	[State.Ready]: [State.Resetting, State.Playing],
	[State.Playing]: [State.Resetting, State.Finished],
	[State.Finished]: [State.Resetting],
};

export const transition = async (to: State) => {
	const { state: from } = useFlowStore.getState();
	const { setState } = useFlowStore.getState().actions;

	console.log(from, "->", to);

	if (!allowed[from]?.includes(to)) {
		return;
	}

	// same resetting flow for all states
	if (to === State.Resetting) {
		const { reset } = getGameStateStore().actions;

		setState(State.Resetting);
		reset();
		await resetWordList();
		transition(State.Ready);
		return;
	}

	if (from === State.Ready && to === State.Playing) {
		const { config, wordList } = getPreGameStore();
		getGameStateStore().actions.init({
			config,
			set: wordList,
			stats: initialStats,
			charIndex: 0,
			wordIndex: 0,
		});

		const first = wordList.words[0];
		setNewWord(first);
	}

	if (from === State.Playing && to === State.Finished) {
		const { config, stats, startTime, set } = getGameStateStore();
		const elapsedTime = startTime ? Date.now() - startTime : 0;

		getSummaryStore().actions.addResult({
			config,
			result: {
				...stats,
				time: elapsedTime,
			},
			analysis: deriveAnalysis(stats, elapsedTime),
			meta: getPreGameStore().meta,
		});
	}

	setState(to);
};

export const initializeFirstLoad = async () => {
	const { resetToDefault } = getGameStateStore().actions;
	const { reset } = getPreGameStore().actions;

	resetToDefault();
	reset();

	await resetWordList();
	transition(State.Ready);
};

export const getGameFlowStore = () => {
	return useFlowStore.getState();
};

export const hasFinished = () => {
	const { mode, mode2 } = usePreGameStore.getState().config;
	const { startTime, stats } = useGameStateStore.getState();

	// time m2 seconds have passed since startTime
	if (mode === Mode.time && startTime) {
		if (Date.now() - startTime >= mode2 * 1000) {
			transition(State.Finished);
		}
	}

	// time m2 totals to number of hit
	if (mode === Mode.characters) {
		if (stats.hits >= mode2) {
			transition(State.Finished);
		}
	}
};
