import { WordSetData } from "@/data/sets/word-set";
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
	meta?: MetaData;
};

export type GameStateData = {
	config: GameConfig;
	set: WordSetData;
	stats: Statistic;
	charIndex: number;
	wordIndex: number;
};

export type EndGameResult = {
	config: GameConfig;
	result: Statistic;
	analysis?: Analysis;
	meta?: MetaData;
};

export type Analysis = {
	lpm: number;
	rawLpm: number;
	accuracy: number;
};

export type Statistic = {
	clicks: number;
	incorrect: number;
	hits: number;
	time: number;
};

export type MetaData = {
	theme?: Theme;
};
