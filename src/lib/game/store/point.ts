import { create } from "zustand";
import { screenConfig } from "../config";
import { State } from "../enum";
import { Point } from "../types";
import { distance, generateCircleLocation } from "../utils";
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
			const point = existPointLocation(x, y, points);
			if (point) {
				if (!checkCorrectPoint(point)) {
					getGameStateStore().actions.handleIncorrect();
					return;
				}
				const newPoints = removePoint(point.index, points);
				set({ points: newPoints });
				getGameStateStore().actions.handleHit();
			} else {
				getGameStateStore().actions.handleClick();
			}
		},
	},
}));

export const usePoints = () => usePointStore((s) => s.points);
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
	const arr = [...points];
	const last = arr.length - 1;

	if (index === last) {
		arr.pop();
	} else {
		[arr[index], arr[last]] = [
			{ ...arr[last], index },
			{ ...arr[index], index: last },
		];
		arr.pop();
	}

	return arr;
};

const existPointLocation = (x: number, y: number, points: Point[]) => {
	const { targetSize } = getGameStateStore().config;

	for (const point of points) {
		if (distance(x, y, point.x, point.y) > targetSize / 2) continue;
		return point;
	}
};

const checkCorrectPoint = (point: Point) => {
	const { charIndex, set: wordSet, wordIndex } = getGameStateStore();
	const currentChar = wordSet.words[wordIndex][charIndex];

	// is correct
	return point.value === currentChar;
};
