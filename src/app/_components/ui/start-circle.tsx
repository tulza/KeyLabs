import { motion, Variants } from "motion/react";
import { CursorIcon } from "@/components/icon";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/ui/tooltip";
import { State } from "@/lib/game/enum";
import { transition, useGameState } from "@/lib/game/store/state-manager";
import { cn } from "@/lib/utils";
import { Loader } from "./loader";

export const StartCircle = () => {
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
								<CursorIcon className="size-5 text-background" />
							</>
						) : (
							<Loader className="size-6 *:stroke-background" />
						)}
					</motion.button>
				</TooltipTrigger>
				<TooltipContent>Start Test</TooltipContent>
			</Tooltip>
		</TooltipProvider>
	);
};

const hitCircleVariant: Variants = {
	initial: { opacity: 0 },
	animate: {
		opacity: 1,
	},
	exit: { opacity: 0, scale: 1.2 },
};
