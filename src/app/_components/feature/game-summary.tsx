"use client";

import { motion } from "motion/react";
import Link from "next/link";
import { HtmlHTMLAttributes, PropsWithChildren } from "react";
import { CrownIcon, PlusIcon, ResetIcon } from "@/components/icon";
import { Button } from "@/components/ui/button";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/ui/tooltip";
import { createEasingFn } from "@/lib/ease";
import { State } from "@/lib/game/enum";
import { transition } from "@/lib/game/store/state-manager";
import { useLatestResult } from "@/lib/game/store/summary";
import { EndGameResult, Plot } from "@/lib/game/types";
import { lerp } from "@/lib/math";
import { cn } from "@/lib/utils";

export function SummaryScreen() {
	const result = useLatestResult();

	if (!result) return null;

	return (
		<div className="flex flex-col items-center gap-6 px-10">
			<div className="flex h-min items-stretch gap-1">
				<SummaryCard result={result} />
				<CirclePlot plot={result.plot} />
			</div>
			<PostGameNavigation />
		</div>
	);
}

type Point = { x: number; y: number };

const parsePlotArray = (plot: number[]): Point[] => {
	const points: Point[] = [];
	for (let i = 0; i < plot.length; i += 2) {
		points.push({ x: plot[i], y: plot[i + 1] });
	}
	return points;
};

const INIT_DELAY = 0.5;
const TOTAL_DURATION = 1;
const easeInQuart = createEasingFn("inQuad");

const CirclePlot = ({ plot }: { plot: Plot }) => {
	const pointData = parsePlotArray(plot);
	return (
		<div
			className="aspect-square w-auto self-stretch rounded bg-secondary"
			style={{ width: "236px" }}
		>
			<div className="relative aspect-square size-full rounded-full bg-secondary-muted outline-4 outline-background">
				{pointData.map((p, idx) => {
					const percentX = lerp(p.x, -1, 1, 0, 100);
					const percentY = lerp(p.y, -1, 1, 0, 100);
					const t = easeInQuart(idx / pointData.length);
					const delay = t * TOTAL_DURATION + INIT_DELAY;
					return (
						<motion.div
							key={idx}
							className="absolute [translate:-50%_-50%]"
							style={{
								left: `${percentX}%`,
								top: `${percentY}%`,
							}}
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							transition={{ delay, duration: 0 }}
						>
							<PlusIcon className="size-5 text-secondary/80" />
						</motion.div>
					);
				})}
			</div>
		</div>
	);
};

const SummaryCard = ({ result }: { result: EndGameResult }) => {
	const { config, result: stats, analysis, duration } = result;
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
	const timeDisplay = `${(duration / 1000).toFixed(0)}s`;
	const time2dpDisplay = `${(duration / 1000).toFixed(2)}s`;
	const modeDisplay = `${mode} ${mode2} / ${wordSet} / ${targetSize}`;

	return (
		<div className="bg w-125 select-none space-y-1 overflow-hidden rounded-t-sm font-medium text-sm">
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
							<Tooltip key={label}>
								<TooltipTrigger asChild>
									<Block>
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
	);
};

const PostGameNavigation = () => {
	return (
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
				<Link href="/leaderboard">
					<Button variant="ghost" size="icon-lg">
						<CrownIcon />
					</Button>
				</Link>
			</div>
		</div>
	);
};

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
