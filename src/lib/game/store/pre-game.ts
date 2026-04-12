import { create } from "zustand";
import { useShallow } from "zustand/react/shallow";
import { defaultWordSet, WordSetData } from "@/data/sets/word-set";
import { defaultConfig } from "../config";
import { Mode, WordSet } from "../enum";
import { generateWordList, generateWordListAsync } from "../generate";
import { modeOptions } from "../options";
import { GameConfig, MetaData } from "../types";

type PreGameStore = {
	config: GameConfig;
	// this should only update on word set change
	wordList: WordSetData;
	meta?: MetaData;
	actions: {
		setConfig: (config: GameConfig) => void;
		setMeta: (meta: MetaData) => void;
		reset: () => void;
	};
};

const initialState = {
	config: defaultConfig,
	wordList: defaultWordSet,
	meta: undefined,
};

const resolveWordList = (config: GameConfig, prev: GameConfig) =>
	// check if word set has changed
	// if so, generate new word list
	config.wordSet !== prev.wordSet
		? generateWordList(config)
		: usePreGameStore.getState().wordList;

export const usePreGameStore = create<PreGameStore>((set, get) => ({
	...initialState,
	actions: {
		setConfig: (config) =>
			// check config and update wordlist if necessary
			set({ config, wordList: resolveWordList(config, get().config) }),
		setMeta: (meta) => set({ meta }),
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
	// changing word set
	const config = {
		...usePreGameStore.getState().config,
		wordSet: setName,
	} as GameConfig;
	const wordList = await generateWordListAsync(config);
	usePreGameStore.setState({ config, wordList });
};

export const resetWordList = async () => {
	const config = usePreGameStore.getState().config;
	const wordList = await generateWordListAsync(config);

	usePreGameStore.setState({ wordList });
};

export const changeMode = (mode: Mode) => {
	const config = usePreGameStore.getState().config;
	const newConfig = { ...config, mode, mode2: modeOptions[mode][0] };
	usePreGameStore.getState().actions.setConfig(newConfig);
};

export const getPreGameStore = () => {
	return usePreGameStore.getState();
};
