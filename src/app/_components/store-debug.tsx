import {
	usePreGameConfig,
	usePreGameWordList,
} from "@/lib/game/store/pre-game";
import { useGameFlowState } from "@/lib/game/store/state";

export const DebugWindow = () => {
	const state = useGameFlowState();
	const config = usePreGameConfig();
	const wordList = usePreGameWordList();

	const data = { state, config, wordList };

	return (
		<div className="fixed top-3 left-3 z-9999 w-72 rounded bg-black/80 font-mono text-xs backdrop-blur-sm">
			<div className="flex items-center justify-between border-border border-b px-3 py-2">
				<span className="text-[10px] text-background tracking-widest">
					DEBUG
				</span>
				<span className="rounded bg-background px-2 py-1 font-medium">
					{state}
				</span>
			</div>
			<pre className="max-h-80 overflow-scroll p-3 text-slate-300 leading-relaxed">
				{JSON.stringify(data, null, 2)}
			</pre>
		</div>
	);
};
