import { create } from "zustand";
import { screenConfig } from "../config";
import { Point } from "../types";
import { distance, generateCircleLocation } from "../utils";
import { getGameStateStore } from "./game";

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
			const points = getPointStore().points;
			const point = existPointLocation(x, y, points);
			if (point) {
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

	console.log(word, points);

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
		// miss
		if (distance(x, y, point.x, point.y) > targetSize / 2) continue;

		// wrong char
		if (point.value !== points[points.length - 1].value) continue;

		return point;
	}
};
