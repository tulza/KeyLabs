import hash from "object-hash";
import { create } from "zustand";
import { Mode, State } from "@/lib/game/enum";
import { EndGameResult } from "../types";
import { deriveAnalysis } from "../utils";
import { getGameStateStore, initialStats, useGameStateStore } from "./game";
import { setNewWord } from "./point";
import { getPreGameStore, resetWordList, usePreGameStore } from "./pre-game";
import { getSummaryStore } from "./summary";

type GameFlowStore = {
	state: State;
	initialized: boolean;
	actions: {
		setState: (state: State) => void;
	};
};

export const useFlowStore = create<GameFlowStore>((set) => ({
	state: State.Resetting,
	initialized: false,
	actions: {
		setState: (state) => {
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

export const transition = async (to: State, forced = false) => {
	const { state: from } = useFlowStore.getState();
	const { setState } = useFlowStore.getState().actions;

	if (!allowed[from]?.includes(to) && !forced) {
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
		const { config, stats: result, startTime } = getGameStateStore();
		const elapsedTime = startTime ? Date.now() - startTime : 0;

		const gameHash = hash({ config, result });

		const gameSummary = {
			config,
			result,
			analysis: deriveAnalysis(result, elapsedTime),
			meta: getPreGameStore().meta,
			startTime,
			duration: elapsedTime,
			hash: gameHash,
		} as EndGameResult;

		getSummaryStore().actions.addResult(gameSummary);
	}

	setState(to);
};

export const initializeFirstLoad = async () => {
	const { initialized } = useFlowStore.getState();
	if (initialized) return;

	const { resetToDefault } = getGameStateStore().actions;
	const { reset } = getPreGameStore().actions;

	resetToDefault();
	reset();
	await transition(State.Resetting, true);

	useFlowStore.setState({ initialized: true });
};

export const getGameFlowStore = () => {
	return useFlowStore.getState();
};

export const hasFinished = () => {
	const { state } = useFlowStore.getState();
	if (state !== State.Playing) return;

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

export const isPregame = () => {
	return [State.Resetting, State.Ready].includes(
		useFlowStore.getState().state,
	);
};
