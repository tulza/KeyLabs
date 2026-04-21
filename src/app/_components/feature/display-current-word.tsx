"use client";

import { useLayoutEffect, useRef, useState } from "react";
import { useShallow } from "zustand/react/shallow";
import { useWordIndex } from "@/lib/game/store/game";
import { usePreGameStore } from "@/lib/game/store/pre-game";
import { useIsPregame } from "@/lib/game/store/state-manager";
import { cn } from "@/lib/utils";

const MaxPixelWidth = 64;

export const DisplayCurrentWord = () => {
	const { charIndex, wordIndex } = useWordIndex();
	const { words } = usePreGameStore(useShallow((s) => s.wordList));
	const currentWord = words[wordIndex] || "";
	const isPregame = useIsPregame();

	const containerRef = useRef<HTMLParagraphElement>(null);
	const [fontSize, setFontSize] = useState<number>(0);

	useLayoutEffect(() => {
		const calculate = () => {
			if (!containerRef.current || !currentWord) return;

			const containerWidth =
				containerRef.current.getBoundingClientRect().width;
			const targetWidth = containerWidth * 1.25;
			const charCount = currentWord.length;

			// Each character should be square-ish; font-size ≈ width per char
			// We derive px size so that charCount * fontSize = targetWidth
			const pxPerChar = Math.min(targetWidth / charCount, MaxPixelWidth);
			setFontSize(pxPerChar);
		};

		calculate();

		const observer = new ResizeObserver(calculate);
		if (containerRef.current) observer.observe(containerRef.current);
		return () => observer.disconnect();
	}, [currentWord, isPregame]);

	if (isPregame) return null;

	return (
		<p
			ref={containerRef}
			className={
				"pointer-events-none absolute top-1/2 flex w-full -translate-y-1/2 justify-center whitespace-pre font-light font-serif italic tracking-wide"
			}
			style={{
				fontSize: fontSize > 0 ? `${fontSize}px` : undefined,
			}}
		>
			{currentWord.split("").map((char, j) => (
				<span
					key={`${j}/${currentWord}`}
					className={cn(
						"text-foreground/50",
						charIndex > j && "text-transparent",
					)}
				>
					{char}
				</span>
			))}
		</p>
	);
};
