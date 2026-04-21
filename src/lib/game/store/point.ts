import { create } from "zustand";
import { useShallow } from "zustand/react/shallow";
import { screenConfig } from "../config";
import { State } from "../enum";
import { Point } from "../types";
import { generateCircleLocation } from "../utils";
import { getGameStateStore } from "./game";
import { useFlowStore } from "./state-manager";

type PointStore = {
	points: Point[];
	current: string;
	actions: {
		set: (points: Point[], current: string) => void;
		handleClick: (x: number, y: number) => void;
	};
};

export const usePointStore = create<PointStore>((set) => ({
	points: [],
	current: "",
	actions: {
		set: (points, current) => set({ points, current }),
		handleClick: (x, y) => {
			const state = useFlowStore.getState().state;

			if (state !== State.Playing) return;

			const points = getPointStore().points;
			const { point, dx, dy } = existPointLocation(x, y, points);
			if (point) {
				if (!checkCorrectPoint(point)) {
					getGameStateStore().actions.handleIncorrect();
					return;
				}
				const newPoints = removePoint(point.index, points);
				set({ points: newPoints });
				getGameStateStore().actions.handleHit(dx, dy);
			} else {
				getGameStateStore().actions.handleClick();
			}
		},
	},
}));

export const usePoints = () => usePointStore(useShallow((s) => s.points));
export const useCurrent = () => usePointStore((s) => s.current);
export const usePointActions = () => usePointStore((s) => s.actions);
export const getPointStore = () => usePointStore.getState();

export const setNewWord = (word: string) => {
	const { targetSize } = getGameStateStore().config;
	const points = generateCircleLocation(word, targetSize, screenConfig);
	const { set } = getPointStore().actions;

	// console.log(new Error().stack);
	// console.log(word, points);

	set(points, word);
};

const removePoint = (index: number, points: Point[]): Point[] => {
	return points.filter((p) => p.index !== index);
};

const existPointLocation = (x: number, y: number, points: Point[]) => {
	const { targetSize } = getGameStateStore().config;
	const radiusSq = (targetSize / 2) ** 2;

	for (const point of points) {
		const dx = x - point.x;
		const dy = y - point.y;
		if (dx * dx + dy * dy <= radiusSq) {
			return { point, dx, dy };
		}
	}

	return {};
};

const checkCorrectPoint = (point: Point) => {
	const { charIndex, set: wordSet, wordIndex } = getGameStateStore();
	const currentChar = wordSet.words[wordIndex][charIndex];

	// is correct
	return point.value === currentChar;
};
