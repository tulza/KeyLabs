import { create } from "zustand";
import { useShallow } from "zustand/react/shallow";
import { EndGameResult } from "../types";

type SummaryStore = {
	results: EndGameResult[];
	actions: {
		addResult: (result: EndGameResult) => void;
		clear: () => void;
	};
};

export const useSummaryStore = create<SummaryStore>((set) => ({
	results: [],
	actions: {
		addResult: (result) =>
			set((prev) => ({ results: [...prev.results, result] })),
		clear: () => set({ results: [] }),
	},
}));

export const useLatestResult = () =>
	useSummaryStore((s) => s.results.at(-1) ?? null);

export const useSummaryHistory = () =>
	useSummaryStore(useShallow((s) => s.results));

export const useSummaryActions = () => useSummaryStore((s) => s.actions);

export const getSummaryStore = () => useSummaryStore.getState();
