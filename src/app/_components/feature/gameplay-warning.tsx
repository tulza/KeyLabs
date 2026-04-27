"use client";

import { PropsWithChildren, useEffect, useState } from "react";

const minWidth = 900;
const minHeight = 850;

export function GameplayWarning({ children }: PropsWithChildren) {
	const [tooSmall, setTooSmall] = useState(false);

	useEffect(() => {
		const check = () => {
			setTooSmall(
				window.innerWidth < minWidth || window.innerHeight < minHeight,
			);
		};
		check();
		window.addEventListener("resize", check);
		return () => window.removeEventListener("resize", check);
	}, []);

	if (!tooSmall) return children;

	return (
		<div className="absolute inset-0 z-999 flex flex-col items-center justify-center backdrop-blur-xs">
			<div className="flex flex-col items-center rounded bg-background px-6 py-3 font-medium">
				<p className="font-semibold text-lg">
					Sorry, your screen is too small.
				</p>
				<p className="text-muted-foreground text-sm">
					Please zoom out.
				</p>
				<p className="mt-1 text-muted-foreground text-sm">
					Minimum screen size: {minWidth}×{minHeight}
				</p>
				<p className="text-muted-foreground text-sm">( ᵕ —ᆺ— )</p>
			</div>
		</div>
	);
}
