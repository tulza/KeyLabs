import { CursorIcon } from "@/components/icon";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/ui/tooltip";
import { State } from "@/lib/game/enum";
import { useGameConfig } from "@/lib/game/store/game";
import { usePoints } from "@/lib/game/store/point";
import { transition, useGameState } from "@/lib/game/store/state-manager";
import { Point } from "@/lib/game/types";

export const TargetLayer = () => {
	const state = useGameState();
	const { targetSize } = useGameConfig();
	const points = usePoints();

	if (state === State.Ready) {
		return <StartCircle />;
	}

	if (state === State.Playing) {
		return points.map((point) => (
			<HitCircle key={point.id} point={point} size={targetSize} />
		));
	}
};

const StartCircle = () => {
	return (
		<TooltipProvider>
			<Tooltip>
				<TooltipTrigger asChild>
					<button
						onClick={() => transition(State.Playing)}
						data-slot="circle"
						className="absolute inset-1/2 z-50 flex size-16 cursor-pointer items-center justify-center rounded-full bg-foreground [translate:-50%_-50%]"
					>
						<div className="-z-10 absolute inset-1/2 size-3/4 animate-ping rounded-full bg-foreground [translate:-50%_-50%]" />
						<CursorIcon className="size-5 *:fill-muted" />
					</button>
				</TooltipTrigger>
				<TooltipContent>Start Test</TooltipContent>
			</Tooltip>
		</TooltipProvider>
	);
};

const HitCircle = ({ point, size }: { point: Point; size: number }) => {
	return (
		<div
			style={{
				left: point.x,
				top: point.y,
				width: size,
				height: size,
			}}
			className="pointer-events-none absolute flex items-center justify-center rounded-full bg-icon font-mono text-muted text-xl [translate:-50%_-50%]"
		>
			{point.value}
		</div>
	);
};
