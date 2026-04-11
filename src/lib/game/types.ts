import { Mode, Theme, WordSet } from "@/lib/game/enum";

export type Screen = { width: number; height: number };

export type Point = {
	index: number;
	value: string;
	x: number;
	y: number;
	id: string;
};

export type GameConfig = {
	mode: Mode;
	mode2: number;
	wordSet: WordSet;
	targetSize: number;
};

export type PreGameConfig = {
	config: GameConfig;
	meta?: {
		fun?: never[];
		theme?: Theme;
	};
};

export type EndGameConfig = {
	config: GameConfig;
	result: {
		clicks: number;
		hits: number;
		time: number;
	};
	analysis?: never[];
};

export type Analysis = {
	lpm: number;
	maxLpm: number;
	accuracy: number;
};
