import { useEffect, useRef, useState } from "react";
import { ResetIcon } from "@/components/icon";
import { PieTimer } from "@/components/icon/pie";
import { Button } from "@/components/ui/button";
import { useWordIndex } from "@/lib/game/store/game";
import { usePreGameStore } from "@/lib/game/store/pre-game";
import { cn } from "@/lib/utils";

export const GameBar = () => {
	return (
		<div className="grid w-225 grid-cols-[120px_1fr_120px] gap-24">
			<div className="flex h-10 max-h-10 items-center gap-3 rounded border-2 border-secondary bg-muted px-3 font-mono font-normal text-icon">
				<PieTimer duration={30} className="size-6 min-w-6" />
				24.05s
			</div>
			<WordBar />
			<Button variant="secondary" size="icon" className="place-self-end">
				<ResetIcon />
			</Button>
		</div>
	);
};

export const WordBar = () => {
	const refs = useRef<HTMLDivElement[]>([]);
	const [offset, setOffset] = useState(0);

	const { words } = usePreGameStore().wordList;

	const { charIndex, wordIndex } = useWordIndex();

	useEffect(() => {
		const ref = refs.current[wordIndex];
		if (!ref) return;
		const totalOffset = refs.current
			.slice(0, wordIndex + 1)
			.reduce((acc, el) => acc + el.getBoundingClientRect().width, 0);
		setOffset(totalOffset - ref.getBoundingClientRect().width / 2);
	}, [wordIndex, words]);

	return (
		<div className="relative flex h-10 w-full select-none overflow-hidden rounded border-2 border-secondary bg-muted shadow-inner shadow-secondary">
			<div className="-translate-x-1/2 absolute bottom-0 left-1/2 z-50 translate-y-1 text-[8px]">
				▲
			</div>
			<div
				className="absolute top-0 left-1/2 flex h-full w-min"
				style={{ transform: `translateX(-${offset}px)` }}
			>
				{words.map((word, i) => (
					<div
						key={`${i}/${word}`}
						ref={(el) => {
							if (!el) return;
							refs.current[i] = el;
						}}
						className={cn(
							"last-border-r flex h-full items-center gap-3 whitespace-nowrap border-secondary border-r bg-muted px-3 font-mono font-normal text-icon first:border-l",
							i > wordIndex && "text-secondary",
						)}
					>
						{word}
					</div>
				))}
			</div>
		</div>
	);
};
