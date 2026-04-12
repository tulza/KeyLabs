import { sum } from "radash";
import { useEffect, useRef } from "react";
import { ResetIcon } from "@/components/icon";
import { PieTimer } from "@/components/icon/pie";
import { Button } from "@/components/ui/button";
import { State } from "@/lib/game/enum";
import { useWordIndex } from "@/lib/game/store/game";
import { usePreGameStore } from "@/lib/game/store/pre-game";
import { useGameState } from "@/lib/game/store/state-manager";
import { cn } from "@/lib/utils";

export const GameBar = () => {
	return (
		<div className="grid w-225 grid-cols-[120px_1fr_120px] gap-24">
			<div className="flex h-10 max-h-10 items-center gap-3 rounded border-2 border-secondary bg-muted px-3 font-mono font-normal text-icon">
				<PieTimer duration={30} className="size-6 min-w-6" />
				NaNs
			</div>
			<WordBar />
			<Button variant="secondary" size="icon" className="place-self-end">
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

	const { words } = usePreGameStore().wordList;
	const { charIndex, wordIndex } = useWordIndex();

	useEffect(() => {
		widthRefs.current = [];
	}, [words]);

	useEffect(() => {
		const container = containerRef.current;
		if (!container) return;

		requestAnimationFrame(() => {
			const currentWidth = mirrorRef.current?.offsetWidth ?? 0;

			// clear previous
			if (prevActiveRef.current) {
				prevActiveRef.current.style.minWidth = "";
			}

			// set new
			if (activeRef.current) {
				activeRef.current.style.minWidth = `${currentWidth}px`;
				prevActiveRef.current = activeRef.current;
			}

			const totalOffset = sum(widthRefs.current.slice(0, wordIndex));
			container.style.transform = `translateX(-${totalOffset + currentWidth / 2}px)`;
		});
	}, [wordIndex, words, state]);

	const baseClass = cn(
		"last-border-r flex h-full items-center whitespace-nowrap border-secondary border-r bg-muted px-3 font-mono font-normal text-icon first:border-l",
		"duration-500 ease-in-expo ease-in-out *:inline-block *:transition-colors",
	);

	const currentClass = "font-medium text-xl";

	return (
		<div className="relative flex h-10 w-full select-none overflow-hidden rounded border-2 border-secondary bg-muted shadow-inner shadow-secondary">
			<div className="-translate-x-1/2 absolute bottom-0 left-1/2 z-50 translate-y-1 text-[8px]">
				▲
			</div>

			{/* mirror row — measures all words at base size, invisible */}
			<div className="pointer-events-none invisible absolute flex h-full">
				{words.map((word, i) => (
					<div
						key={`mirror/${i}/${word}`}
						ref={(el) => {
							if (!el) return;
							widthRefs.current[i] =
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

			<div
				className="absolute top-0 left-1/2 flex h-full w-min transition-transform duration-500 ease-in-expo"
				ref={containerRef}
			>
				{state !== State.Resetting &&
					words.map((word, i) => {
						const isCurrent = i === wordIndex;
						const isAfter = i > wordIndex;
						const isBefore = i < wordIndex;

						return (
							<div
								key={`${i}/${word}`}
								ref={isCurrent ? activeRef : undefined}
								className={cn(
									baseClass,
									isAfter && "text-secondary",
									isBefore &&
										"bg-secondary/15 text-secondary/80",
									isCurrent && currentClass,
								)}
							>
								{isCurrent ? (
									<CurrentText
										word={word}
										charIndex={charIndex}
									/>
								) : (
									word
								)}
							</div>
						);
					})}
			</div>
		</div>
	);
};

const CurrentText = ({
	word,
	charIndex,
}: {
	word: string;
	charIndex: number;
}) => {
	const upcomingText = word.slice(0, charIndex);
	const currentText = word.slice(charIndex, word.length);

	return (
		<>
			{upcomingText.split("").map((char, i) => (
				<span key={`${i}/${char}/${word}`}>{char}</span>
			))}
			{currentText.split("").map((char, i) => (
				<span
					key={`${i}/${char}/${word}`}
					className="text-foreground/50"
				>
					{char}
				</span>
			))}
		</>
	);
};
