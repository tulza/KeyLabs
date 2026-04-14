import { HtmlHTMLAttributes, PropsWithChildren, useRef } from "react";
import { CrownIcon, ResetIcon } from "@/components/icon";
import { Button } from "@/components/ui/button";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/ui/tooltip";
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
	const accuracy2dpDisplay = analysis
		? `${(analysis.accuracy * 100).toFixed(2)}%`
		: "—";
	const lpm2dpDisplay = analysis ? analysis.lpm.toFixed(2) : "—";
	const lpmDisplay = analysis ? Math.round(analysis.lpm) : "—";
	const timeDisplay = `${(stats.time / 1000).toFixed(0)}s`;
	const time2dpDisplay = `${(stats.time / 1000).toFixed(2)}s`;
	const modeDisplay = `${mode} ${mode2} / ${wordSet} / ${targetSize}`;

	return (
		<div className="flex flex-col items-center gap-6 px-10" ref={ref}>
			<div className="h-9" />
			<div className="bg w-125 space-y-1 overflow-hidden rounded-t-sm font-medium text-sm">
				<Block>Game analysis</Block>
				<TooltipProvider>
					<div className="grid grid-cols-2 space-x-1">
						<Tooltip>
							<TooltipTrigger asChild>
								<div className="flex flex-col justify-between bg-secondary p-4">
									<span className="text-[52px] text-secondary-foreground leading-none">
										{lpmDisplay}
									</span>
									<span className="mt-3 text-secondary-foreground">
										Letter / Minute
									</span>
								</div>
							</TooltipTrigger>
							<TooltipContent side="left">
								{lpm2dpDisplay} LPM
							</TooltipContent>
						</Tooltip>

						<div className="flex flex-col gap-1">
							{[
								{
									label: "Hits",
									value: hitsDisplay,
									tooltip: "correct / clicks / incorrect",
								},
								{
									label: "Accuracy",
									value: accuracyDisplay,
									tooltip: accuracy2dpDisplay,
								},
								{
									label: "Time",
									value: timeDisplay,
									tooltip: time2dpDisplay,
								},
							].map(({ label, value, tooltip }) => (
								<Tooltip>
									<TooltipTrigger asChild>
										<Block key={label}>
											<span>{label}</span>
											<span>{value}</span>
										</Block>
									</TooltipTrigger>
									<TooltipContent side="right">
										{tooltip}
									</TooltipContent>
								</Tooltip>
							))}
						</div>
					</div>
				</TooltipProvider>

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
				"flex justify-between bg-secondary p-3 text-secondary-foreground",
				props.className,
			)}
		>
			{children}
		</div>
	);
};
