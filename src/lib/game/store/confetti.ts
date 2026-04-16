import type { TConductorInstance } from "react-canvas-confetti/dist/types";
import { create } from "zustand";

interface ConfettiStore {
	conductor: TConductorInstance | null;
	setConductor: (conductor: TConductorInstance) => void;
	shoot: () => void;
	run: (speed?: number, duration?: number) => void;
	stop: () => void;
}

export const useConfettiStore = create<ConfettiStore>((set, get) => ({
	conductor: null,

	setConductor: (conductor) => set({ conductor }),

	shoot: () => {
		get().conductor?.shoot();
	},

	run: (speed = 1, duration) => {
		get().conductor?.run({ speed, duration });
	},

	stop: () => {
		get().conductor?.stop();
	},
}));
