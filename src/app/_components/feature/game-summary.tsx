import { HtmlHTMLAttributes, PropsWithChildren, useRef } from "react";
import { CrownIcon, ResetIcon } from "@/components/icon";
import { Button } from "@/components/ui/button";
import { State } from "@/lib/game/enum";
import { transition } from "@/lib/game/store/state-manager";
import { useLatestResult } from "@/lib/game/store/summary";
import { cn } from "@/lib/utils";

export function SummaryScreen() {
	const result = useLatestResult();
	const ref = useRef<HTMLDivElement>(null);

	if (!result) return null;

	const { config, result: stats, analysis } = result;
	const { mode, mode2, wordSet, targetSize } = config;

	const hitsDisplay = `${stats.hits} / ${stats.clicks} / ${stats.incorrect}`;
	const accuracyDisplay = analysis
		? `${(analysis.accuracy * 100).toFixed(0)}%`
		: "—";
	const lpmDisplay = analysis ? Math.round(analysis.lpm) : "—";
	const timeDisplay = `${(stats.time / 1000).toFixed(0)}s`;
	const modeDisplay = `${mode} ${mode2} / ${wordSet} / ${targetSize}`;

	return (
		<div className="flex flex-col items-center gap-6 px-10" ref={ref}>
			<div className="h-9" />
			<div className="bg w-125 space-y-1 overflow-hidden rounded-t-sm font-medium text-sm">
				<Block>Game analysis</Block>
				<div className="grid grid-cols-2 space-x-1">
					<div className="flex flex-col justify-between bg-secondary p-4">
						<span className="text-[52px] text-foreground leading-none">
							{lpmDisplay}
						</span>
						<span className="mt-3 text-foreground">
							Letter / Minute
						</span>
					</div>

					<div className="flex flex-col gap-1">
						{[
							{ label: "Hits", value: hitsDisplay },
							{ label: "Accuracy", value: accuracyDisplay },
							{ label: "Time", value: timeDisplay },
						].map(({ label, value }) => (
							<Block key={label}>
								<span>{label}</span>
								<span>{value}</span>
							</Block>
						))}
					</div>
				</div>

				<Block className="rounded-b">
					<span>Test type</span>
					<span>{modeDisplay}</span>
				</Block>
			</div>
			<div
				className={cn(
					"grid w-full grid-cols-[20px_auto_2px] items-center justify-between",
				)}
			>
				<div />
				<div className="flex gap-3">
					<Button
						variant="ghost"
						size="icon-lg"
						onClick={() => transition(State.Resetting)}
					>
						<ResetIcon />
					</Button>
					<Button
						variant="ghost"
						size="icon-lg"
						onClick={() => {
							/* open scoreboard */
						}}
					>
						<CrownIcon />
					</Button>
				</div>
			</div>
		</div>
	);
}

const Block = ({
	children,
	...props
}: PropsWithChildren<HtmlHTMLAttributes<HTMLDivElement>>) => {
	return (
		<div
			{...props}
			className={cn(
				"flex justify-between bg-secondary p-3",
				props.className,
			)}
		>
			{children}
		</div>
	);
};
