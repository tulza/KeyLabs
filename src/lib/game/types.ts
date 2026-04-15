import { Static, Type } from "@sinclair/typebox";
import { TypeCompiler } from "@sinclair/typebox/compiler";
import { TWordSetData } from "@/data/sets/word-set";
import { Mode, Theme, WordSet } from "@/lib/game/enum";

export const TScreen = Type.Object({
	width: Type.Number(),
	height: Type.Number(),
});

export type Screen = Static<typeof TScreen>;

export const TPoint = Type.Object({
	index: Type.Number(),
	value: Type.String(),
	x: Type.Number(),
	y: Type.Number(),
	id: Type.String(),
});

export type Point = Static<typeof TPoint>;

export const TGameConfig = Type.Object({
	mode: Type.Enum(Mode),
	mode2: Type.Number(),
	wordSet: Type.Enum(WordSet),
	targetSize: Type.Number(),
});

export type GameConfig = Static<typeof TGameConfig>;

export const TMetaData = Type.Object({
	theme: Type.Optional(Type.Enum(Theme)),
});

export type MetaData = Static<typeof TMetaData>;

export const TStatistic = Type.Object({
	clicks: Type.Number(),
	incorrect: Type.Number(),
	hits: Type.Number(),
	time: Type.Number(),
});

export type Statistic = Static<typeof TStatistic>;

export const TAnalysis = Type.Object({
	lpm: Type.Number(),
	rawLpm: Type.Number(),
	accuracy: Type.Number(),
});

export type Analysis = Static<typeof TAnalysis>;

export const TPreGameConfig = Type.Object({
	config: TGameConfig,
	meta: Type.Optional(TMetaData),
});

export type PreGameConfig = Static<typeof TPreGameConfig>;

export const TGameStateData = Type.Object({
	config: TGameConfig,
	set: TWordSetData,
	stats: TStatistic,
	charIndex: Type.Number(),
	wordIndex: Type.Number(),
});

export type GameStateData = Static<typeof TGameStateData>;

export const TEndGameResult = Type.Object({
	config: TGameConfig,
	result: TStatistic,
	analysis: Type.Optional(TAnalysis),
	startTime: Type.Number(),
	duration: Type.Number(),
	meta: Type.Optional(TMetaData),
	hash: Type.String(),
});

export const VEndGameResult = TypeCompiler.Compile(TEndGameResult);
export type EndGameResult = Static<typeof TEndGameResult>;
