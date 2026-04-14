import { Activity, useState } from "react";
import { Button } from "@/components/ui/button";
import { useGameStateStore } from "@/lib/game/store/game";
import { getPointStore } from "@/lib/game/store/point";
import { usePreGameStore } from "@/lib/game/store/pre-game";
import { useGameState } from "@/lib/game/store/state-manager";

export const DebugWindow = () => {
	const [open, setOpen] = useState(false);

	const state = useGameState();
	const { wordList } = usePreGameStore();
	const { set, stats, charIndex, wordIndex } = useGameStateStore();
	const points = getPointStore();

	const preSet = wordList.words.slice(0, 10).join(", ");
	const currentSet = set.words.slice(0, 10).join(", ");

	const data = {
		state,
		stats,
		charIndex,
		wordIndex,
		preSet,
		currentSet,
		points,
	};

	if (process.env.NODE_ENV === "production") return null;

	return (
		<div className="fixed top-3 left-3 z-9999 w-72 rounded bg-muted font-mono text-xs backdrop-blur-sm">
			<div className="flex items-center justify-between border-border border-b px-3 py-2">
				<span className="text-[10px] text-foreground tracking-widest">
					STORE DEBUG
				</span>
				<Button
					variant="secondary"
					size="icon-xs"
					onClick={() => setOpen(!open)}
				>
					{open ? "-" : "+"}
				</Button>
			</div>
			<Activity mode={open ? "visible" : "hidden"}>
				<pre className="max-h-80 overflow-scroll p-3 text-foreground leading-relaxed">
					{JSON.stringify(data, null, 2)}
				</pre>
			</Activity>
		</div>
	);
};
