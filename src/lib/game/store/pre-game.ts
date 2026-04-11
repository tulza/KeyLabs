import { create } from "zustand";
import { useShallow } from "zustand/react/shallow";
import { WordSetData } from "@/data/sets/word-set";
import { defaultConfig } from "../config";
import { Mode, WordSet } from "../enum";
import { generateWordList, generateWordListAsync } from "../generate";
import { modeOptions } from "../options";
import { GameConfig, MetaData, PreGameConfig } from "../types";

type PreGameStore = {
	config: GameConfig;
	wordList: WordSetData;
	meta?: MetaData;
	actions: {
		setConfig: (config: GameConfig) => void;
		setMeta: (meta: MetaData) => void;
		setPreGameConfig: (preGameConfig: PreGameConfig) => void;
		reset: () => void;
	};
};

const initialState = {
	config: defaultConfig,
	wordList: generateWordList(defaultConfig),
	meta: undefined,
};

const resolveWordList = (config: GameConfig, prev: GameConfig) =>
	config.wordSet !== prev.wordSet
		? generateWordList(config)
		: usePreGameStore.getState().wordList;

export const usePreGameStore = create<PreGameStore>((set, get) => ({
	...initialState,
	actions: {
		setConfig: (config) =>
			set({ config, wordList: resolveWordList(config, get().config) }),
		setMeta: (meta) => set({ meta }),
		setPreGameConfig: ({ config, meta }) =>
			set({
				config,
				meta,
				wordList: resolveWordList(config, get().config),
			}),
		reset: () => set(initialState),
	},
}));

export const usePreGameConfig = () => usePreGameStore((s) => s.config);
export const usePreGameWordList = () =>
	usePreGameStore(useShallow((s) => s.wordList));
export const usePreGameActions = () => usePreGameStore((s) => s.actions);

export const changeWordSetSynced = (setName: WordSet) => {
	const config = usePreGameStore.getState().config;
	const newConfig = { ...config, wordSet: setName };
	usePreGameStore.getState().actions.setConfig(newConfig);
};

export const changeWordSet = async (setName: WordSet) => {
	const config = { ...usePreGameStore.getState().config, wordSet: setName };
	const wordList = await generateWordListAsync(config);
	usePreGameStore.setState({ config, wordList });
};

export const changeMode = (mode: Mode) => {
	const config = usePreGameStore.getState().config;
	const newConfig = { ...config, mode, mode2: modeOptions[mode][0] };
	usePreGameStore.getState().actions.setConfig(newConfig);
};
