import { treaty } from "@elysiajs/eden";
import { create } from "zustand";
import { useShallow } from "zustand/react/shallow";
import { App } from "@/app/api/$";
import { EndGameResult } from "../types";
import { getUser } from "./auth";

type SummaryStore = {
	results: EndGameResult[];
	actions: {
		addResult: (result: EndGameResult) => void;
		clear: () => void;
	};
};

const client = treaty<App>("localhost:4000");

export const useSummaryStore = create<SummaryStore>((set) => ({
	results: [],
	actions: {
		addResult: async (result) => {
			const user = getUser();

			set((prev) => ({ results: [...prev.results, result] }));

			if (user) {
				await client.api.result.post(result);
			}
		},
		clear: () => set({ results: [] }),
	},
}));

export const useLatestResult = () =>
	useSummaryStore((s) => s.results.at(-1) ?? null);

export const useSummaryHistory = () =>
	useSummaryStore(useShallow((s) => s.results));

export const useSummaryActions = () => useSummaryStore((s) => s.actions);

export const getSummaryStore = () => useSummaryStore.getState();
