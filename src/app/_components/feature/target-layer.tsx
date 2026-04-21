"use client";
import { AnimatePresence, motion, Variants } from "motion/react";
import { useRef } from "react";
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
			<AnimatePresence mode="popLayout" key={wordIndex}>
				{points.map((point) => (
					<HitCircle key={point.id} point={point} size={targetSize} />
				))}
			</AnimatePresence>
		);
	}

	return null;
};

const HitCircle = ({ point, size }: { point: Point; size: number }) => {
	const variant = useRef(hitCircleVariant(point.index));

	return (
		<motion.div
			variants={variant.current}
			initial="initial"
			animate="animate"
			exit="exit"
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
const STAGGER = 0.1;

const hitCircleVariant = (index: number): Variants => ({
	initial: { opacity: 0 },
	animate: {
		opacity: 1,
		transition: { duration: 0.2, delay: index * STAGGER },
	},
	exit: { opacity: 0, scale: 1.1, transition: { duration: 0.1 } },
});
