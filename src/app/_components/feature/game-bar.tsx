import { AnimatePresence, motion } from "motion/react";
import { sum } from "radash";
import { useEffect, useLayoutEffect, useRef } from "react";
import { useShallow } from "zustand/react/shallow";
import { ResetIcon } from "@/components/icon";
import { Button } from "@/components/ui/button";
import { ease } from "@/lib/ease";
import { State } from "@/lib/game/enum";
import { useWordIndex } from "@/lib/game/store/game";
import { usePreGameStore } from "@/lib/game/store/pre-game";
import {
	transition,
	useGameState,
	useIsPregame,
} from "@/lib/game/store/state-manager";
import { cn } from "@/lib/utils";
import { ModeIndicator } from "../ui/mode-indicator";

export const GameBar = () => {
	return (
		<div className="grid w-225 grid-cols-[120px_1fr_120px] gap-24">
			<ModeIndicator />
			<WordBar />
			<Button
				onClick={() => transition(State.Resetting)}
				variant="secondary"
				size="icon"
				className="place-self-end"
			>
				<ResetIcon />
			</Button>
		</div>
	);
};

export const WordBar = () => {
	const widthRefs = useRef<number[]>([]);
	const mirrorRef = useRef<HTMLDivElement>(null);
	const prevActiveRef = useRef<HTMLDivElement>(null);
	const activeRef = useRef<HTMLDivElement>(null);
	const containerRef = useRef<HTMLDivElement>(null);
	const state = useGameState();

	const isPregame = useIsPregame();
	const { words, hash } = usePreGameStore(useShallow((s) => s.wordList));
	const { charIndex, wordIndex } = useWordIndex();

	// todo: fix offset calculation with visible before
	const VISIBLE_BEFORE = Number.MAX_SAFE_INTEGER;
	const VISIBLE_AFTER = 30;
	const startIdx = Math.max(0, wordIndex - VISIBLE_BEFORE);
	const endIdx = Math.min(words.length, wordIndex + VISIBLE_AFTER);
	const visibleWords = words.slice(startIdx, endIdx);

	useEffect(() => {
		widthRefs.current = [];
	}, [words]);

	useLayoutEffect(() => {
		const container = containerRef.current;
		if (!container) return;

		const currentWidth = mirrorRef.current?.offsetWidth ?? 0;

		if (prevActiveRef.current) {
			prevActiveRef.current.style.maxWidth = "";
		}

		if (activeRef.current) {
			activeRef.current.style.maxWidth = `${currentWidth}px`;
			prevActiveRef.current = activeRef.current;
		}

		requestAnimationFrame(() => {
			const totalOffset = sum(widthRefs.current.slice(0, wordIndex));
			container.style.transform = `translateX(-${totalOffset + currentWidth / 2}px)`;
		});
	}, [wordIndex, words, state]);

	const baseClass = cn(
		"last-border-r flex h-full w-min items-center whitespace-nowrap border-secondary border-r bg-muted px-3 font-mono font-normal text-icon first:border-l",
		"duration-500 ease-in-expo ease-in-out *:inline-block",
		"*:transition-[color,font-size] *:will-change-[font-size]",
	);

	const currentClass = "font-medium text-xl";

	return (
		<div className="relative flex h-10 w-full select-none overflow-hidden rounded border-2 border-secondary bg-muted shadow-[inset_0_2px_4px_var(--color-accent)]">
			<div className="absolute bottom-0 left-1/2 z-50 -translate-x-1/2 translate-y-1 text-[8px]">
				▲
			</div>

			{/* mirror row — measures all words at base size, invisible */}
			<div className="pointer-events-none invisible absolute flex h-full">
				{visibleWords.map((word, i) => (
					<div
						key={`mirror/${startIdx + i}/${word}`}
						ref={(el) => {
							if (!el) return;
							widthRefs.current[startIdx + i] =
								el.getBoundingClientRect().width;
						}}
						className={baseClass}
					>
						{word}
					</div>
				))}
			</div>

			{/* active word mirror — measures current word at text-xl size */}
			<div
				ref={mirrorRef}
				className={cn(
					baseClass,
					currentClass,
					"pointer-events-none invisible absolute",
				)}
			>
				{words[wordIndex]}
			</div>

			<AnimatePresence mode="popLayout">
				{state !== State.Resetting && (
					<motion.div
						key={hash}
						animate="visible"
						initial="hidden"
						variants={containerVariant}
					>
						<div
							className={cn(
								"absolute top-0 left-1/2 flex h-full w-full transition-[font-size,max-width,transform] duration-500 ease-in-expo will-change-[font-size,max-width]",
								isPregame && "duration-0",
							)}
							ref={(ref) => {
								containerRef.current = ref;
							}}
						>
							{visibleWords.map((word, i) => {
								// a bit vibe coded :wilted_flower:
								const actualIdx = startIdx + i;
								const isCurrent = actualIdx === wordIndex;
								const isAfter = actualIdx > wordIndex;
								const isBefore = actualIdx < wordIndex;

								return (
									<div
										key={`${actualIdx}/${word}`}
										ref={isCurrent ? activeRef : undefined}
										className={cn(
											baseClass,
											isBefore && "bg-secondary/15",
										)}
									>
										{word.split("").map((char, j) => (
											<span
												key={`${j}/${char}/${word}`}
												className={cn(
													"duration-500",
													isCurrent && charIndex > j
														? "text-foreground"
														: "text-foreground/50",
													isAfter &&
														"text-foreground/50",
													isBefore &&
														"text-foreground/50",
													isCurrent && currentClass,
												)}
											>
												{char}
											</span>
										))}
									</div>
								);
							})}
						</div>
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	);
};

// todo: fix exit animation somehow
const containerVariant = {
	hidden: { opacity: 0 },
	visible: {
		opacity: 1,
		transition: { duration: 0.5, ease: ease.outExpo },
	},
};
