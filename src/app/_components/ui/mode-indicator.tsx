import { PropsWithChildren } from "react";
import { CursorIcon } from "@/components/icon";
import { PieTimer } from "@/components/icon/pie";
import { Mode } from "@/lib/game/enum";
import { useGameStateStore } from "@/lib/game/store/game";
import { usePreGameStore } from "@/lib/game/store/pre-game";

export const ModeIndicator = () => {
	const { mode, mode2 } = usePreGameStore().config;
	const { startTime, stats } = useGameStateStore();

	if (mode === Mode.time) {
		return (
			<Container>
				<PieTimer
					duration={mode2}
					startTime={startTime}
					className="size-5 min-w-5"
				/>
			</Container>
		);
	}

	if (mode === Mode.characters) {
		const hitsRemaining = mode2 - stats.hits;
		return (
			<Container>
				<CursorIcon className="size-4 min-w-4" />
				<span className="font-sans slashed-zero tabular-nums">
					{hitsRemaining}
				</span>
			</Container>
		);
	}
};

const Container = ({ children }: PropsWithChildren) => {
	return (
		<div className="flex h-10 max-h-10 items-center justify-between gap-3 rounded border-2 border-secondary bg-muted px-3 font-mono font-normal text-icon">
			{children}
		</div>
	);
};
