import { create } from "zustand";
import { State } from "@/lib/game/enum";

type GameFlowStore = {
	state: State;
	actions: {
		setState: (state: State) => void;
	};
};

export const useGameFlowStore = create<GameFlowStore>((set) => ({
	state: State.Resetting,
	actions: {
		setState: (state) => set({ state }),
	},
}));

export const useGameFlowState = () => useGameFlowStore((s) => s.state);
export const useGameFlowActions = () => useGameFlowStore((s) => s.actions);

export const transition = (to: State) => {
	const { state, actions } = useGameFlowStore.getState();

	const allowed: Partial<Record<State, State[]>> = {
		[State.Resetting]: [State.Ready],
		[State.Ready]: [State.Playing],
		[State.Playing]: [State.Finished],
		[State.Finished]: [State.Resetting],
	};

	if (!allowed[state]?.includes(to)) {
		return;
	}

	actions.setState(to);
};
