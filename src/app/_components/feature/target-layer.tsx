import { AnimatePresence, motion, Variants } from "motion/react";
import { CursorIcon } from "@/components/icon";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/ui/tooltip";
import { State } from "@/lib/game/enum";
import { getGameStateStore, useGameConfig } from "@/lib/game/store/game";
import { usePoints } from "@/lib/game/store/point";
import { transition, useGameState } from "@/lib/game/store/state-manager";
import { Point } from "@/lib/game/types";
import { cn } from "@/lib/utils";
import { Loader } from "../ui/loader";

export const TargetLayer = () => {
	return <TargetLayerState />;
};

export const TargetLayerState = () => {
	const state = useGameState();
	const { wordIndex } = getGameStateStore();

	const { targetSize } = useGameConfig();
	const points = usePoints();

	if (state === State.Ready || state === State.Resetting) {
		return <StartCircle />;
	}

	if (state === State.Playing) {
		return (
			<AnimatePresence mode="popLayout">
				<motion.div
					key={wordIndex}
					initial="initial"
					animate="animate"
					exit="exit"
					variants={animatorVariant}
				>
					{points.map((point) => (
						<HitCircle
							key={point.id}
							point={point}
							size={targetSize}
						/>
					))}
				</motion.div>
			</AnimatePresence>
		);
	}
};

const StartCircle = () => {
	const state = useGameState();

	const isReady = state === State.Ready;

	return (
		<TooltipProvider>
			<Tooltip>
				<TooltipTrigger asChild>
					<motion.button
						onClick={() => transition(State.Playing)}
						data-slot="circle"
						className={cn(
							"absolute inset-1/2 z-50 flex size-16 cursor-pointer items-center justify-center rounded-full bg-foreground [translate:-50%_-50%]",
							!isReady && "pointer-events-none select-none",
						)}
						variants={hitCircleVariant}
					>
						{isReady ? (
							<>
								<div className="-z-10 absolute inset-1/2 size-3/4 animate-ping rounded-full bg-foreground [translate:-50%_-50%]" />
								<CursorIcon className="size-5 *:fill-muted" />
							</>
						) : (
							<Loader className="size-6 *:stroke-secondary" />
						)}
					</motion.button>
				</TooltipTrigger>
				<TooltipContent>Start Test</TooltipContent>
			</Tooltip>
		</TooltipProvider>
	);
};

const HitCircle = ({ point, size }: { point: Point; size: number }) => {
	return (
		<motion.div
			variants={hitCircleVariant}
			style={{
				left: point.x,
				top: point.y,
				width: size,
				height: size,
			}}
			className="pointer-events-none absolute flex items-center justify-center rounded-full bg-icon font-mono text-muted text-xl [translate:-50%_-50%]"
		>
			{point.value}
		</motion.div>
	);
};

const animatorVariant = {
	initial: { opacity: 0 },
	animate: {
		opacity: 1,
		transition: {
			staggerChildren: 0.1,
			staggerDirection: -1,
			delayChildren: 0,
		},
	},
	exit: { opacity: 0 },
};

const hitCircleVariant: Variants = {
	initial: { opacity: 0 },
	animate: {
		opacity: 1,
	},
	exit: { opacity: 0, scale: 1.2 },
};
