import { create } from "zustand";
import { useShallow } from "zustand/react/shallow";
import { defaultConfig, defaultWordSet } from "../config";
import { Mode, State, WordSet } from "../enum";
import { generateWordListAsync } from "../generate";
import { modeOptions } from "../options";
import { GameConfig, WordSetData } from "../types";
import { transition } from "./state-manager";

type PreGameStore = {
	config: GameConfig;
	// this should only update on word set change
	wordList: WordSetData;
	actions: {
		setConfig: (config: GameConfig) => void;
		reset: () => void;
	};
};

const initialState = {
	config: defaultConfig,
	wordList: defaultWordSet,
};

export const usePreGameStore = create<PreGameStore>((set) => ({
	...initialState,
	actions: {
		setConfig: (config) =>
			// check config and update wordlist if necessary
			set({ config }),
		reset: () => set(initialState),
	},
}));

export const usePreGameConfig = () =>
	usePreGameStore(useShallow((s) => s.config));
export const usePreGameWordList = () =>
	usePreGameStore(useShallow((s) => s.wordList));
export const usePreGameActions = () => usePreGameStore((s) => s.actions);

export const changeWordSetSynced = (setName: WordSet) => {
	const config = usePreGameStore.getState().config;
	const newConfig = { ...config, wordSet: setName };
	usePreGameStore.getState().actions.setConfig(newConfig);
};

export const changeWordSet = async (setName: WordSet) => {
	const config = {
		...usePreGameStore.getState().config,
		wordSet: setName,
	} as GameConfig;
	usePreGameStore.setState({ config });
	transition(State.Resetting);
	await resetWordList();
	transition(State.Ready);
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

export const handleModeChange = (newMode: Mode) => {
	const {
		actions: { setConfig },
		config,
	} = usePreGameStore.getState();

	if (config.mode === newMode) return;

	setConfig({
		...config,
		mode: newMode,
		mode2: modeOptions[newMode][0],
	});
};

export const handleMode2Change = (value: number) => {
	const {
		actions: { setConfig },
		config,
	} = usePreGameStore.getState();

	if (config.mode2 === value) return;

	setConfig({ ...config, mode2: value });
};
