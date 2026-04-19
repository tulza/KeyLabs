"use client";
import { AnimatePresence, motion, Variants } from "motion/react";
import { State } from "@/lib/game/enum";
import { useGameConfig, useWordIndex } from "@/lib/game/store/game";
import { usePoints } from "@/lib/game/store/point";
import { useGameState } from "@/lib/game/store/state-manager";
import { Point } from "@/lib/game/types";
import { StartCircle } from "../ui/start-circle";

export const TargetLayer = () => {
	return <TargetLayerState />;
};

export const TargetLayerState = () => {
	const state = useGameState();
	const { wordIndex } = useWordIndex();

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
