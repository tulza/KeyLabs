import { create } from "zustand";
import { State } from "@/lib/game/enum";
import { getGameStateStore } from "./game";
import { setNewWord } from "./point";
import { getPreGameStore, resetWordList } from "./pre-game";

type GameFlowStore = {
	state: State;
	actions: {
		setState: (state: State) => void;
	};
};

export const useGameFlowStore = create<GameFlowStore>((set) => ({
	state: State.Resetting,
	actions: {
		setState: (state) => {
			console.log(state);
			set({ state });
		},
	},
}));

export const useGameState = () => useGameFlowStore((s) => s.state);
export const useGameActions = () => useGameFlowStore((s) => s.actions);

const allowed: Readonly<Partial<Record<State, State[]>>> = {
	[State.Resetting]: [State.Ready],
	// can reset at any time
	[State.Ready]: [State.Resetting, State.Playing],
	[State.Playing]: [State.Resetting, State.Finished],
	[State.Finished]: [State.Resetting],
};

export const transition = async (to: State) => {
	const { state: from, actions } = useGameFlowStore.getState();

	console.log(from, "->", to);

	if (!allowed[from]?.includes(to)) {
		return;
	}

	// same resetting flow for all states
	if (to === State.Resetting) {
		actions.setState(State.Resetting);
		await resetWordList();
		transition(State.Ready);
		return;
	}

	if (from === State.Ready && to === State.Playing) {
		const { config, wordList } = getPreGameStore();
		getGameStateStore().actions.init({
			config,
			set: wordList,
			stats: { clicks: 0, hits: 0, time: 0 },
			charIndex: 0,
			wordIndex: 0,
		});

		const first = wordList.words[0];
		setNewWord(first);
	}

	actions.setState(to);
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
	return useGameFlowStore.getState();
};
