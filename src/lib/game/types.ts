import { TypeCompiler } from "@sinclair/typebox/compiler";
import { Static, t } from "elysia";
import { Mode, Theme, WordSet } from "@/lib/game/enum";

export const TScreen = t.Object({
	width: t.Number(),
	height: t.Number(),
});

export type Screen = Static<typeof TScreen>;

export const TPoint = t.Object({
	index: t.Number(),
	value: t.String(),
	x: t.Number(),
	y: t.Number(),
	id: t.String(),
});

export type Point = Static<typeof TPoint>;

export const TGameConfig = t.Object({
	mode: t.Enum(Mode),
	mode2: t.Number(),
	wordSet: t.Enum(WordSet),
	targetSize: t.Number(),
});

export const TWordSetData = t.Object({
	name: t.String(),
	hash: t.String(),
	description: t.Optional(t.String()),
	words: t.Array(t.String()),
});

export type WordSetData = Static<typeof TWordSetData>;

export type GameConfig = Static<typeof TGameConfig>;

export const TMetaData = t.Object({
	theme: t.Optional(t.Enum(Theme)),
});

export type MetaData = Static<typeof TMetaData>;

export const TStatistic = t.Object({
	clicks: t.Number(),
	incorrect: t.Number(),
	hits: t.Number(),
});

export type Statistic = Static<typeof TStatistic>;

export const TAnalysis = t.Object({
	lpm: t.Number(),
	rawLpm: t.Number(),
	accuracy: t.Number(),
});

export type Analysis = Static<typeof TAnalysis>;

export const TPlot = t.Array(t.Number());

export type Plot = Static<typeof TPlot>;

export const TPreGameConfig = t.Object({
	config: TGameConfig,
	meta: t.Optional(TMetaData),
});

export type PreGameConfig = Static<typeof TPreGameConfig>;

export const TGameStateData = t.Object({
	config: TGameConfig,
	set: TWordSetData,
	stats: TStatistic,
	charIndex: t.Number(),
	wordIndex: t.Number(),
});

export type GameStateData = Static<typeof TGameStateData>;

export const TEndGameResult = t.Object({
	config: TGameConfig,
	result: TStatistic,
	analysis: TAnalysis,
	plot: TPlot,
	startTime: t.Number(),
	duration: t.Number(),
	meta: t.Optional(TMetaData),
	hash: t.String(),
});

export const VEndGameResult = TypeCompiler.Compile(TEndGameResult);
export type EndGameResult = Static<typeof TEndGameResult>;
