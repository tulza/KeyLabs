import { CrownIcon, ResetIcon } from "@/components/icon";
import { Button } from "@/components/ui/button";
import { State } from "@/lib/game/enum";
import { transition } from "@/lib/game/store/state-manager";
import { useLatestResult } from "@/lib/game/store/summary";

export function SummaryScreen() {
	const result = useLatestResult();

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
		<div className="flex flex-col items-center gap-6">
			<div className="bg w-125 space-y-1 overflow-hidden rounded-t-sm font-medium text-sm">
				<div className="bg-secondary px-4 py-2.5 text-foreground">
					Game analysis
				</div>
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
							<div
								key={label}
								className="flex h-11 items-center justify-between bg-secondary px-4"
							>
								<span>{label}</span>
								<span>{value}</span>
							</div>
						))}
					</div>
				</div>

				<div className="flex justify-between rounded-b-sm bg-secondary p-3">
					<span>Type</span>
					<span>{modeDisplay}</span>
				</div>
			</div>

			<div className="flex items-center gap-8">
				<Button
					variant="ghost"
					size="lg"
					onClick={() => transition(State.Resetting)}
				>
					<ResetIcon />
					Play again
				</Button>
				<Button
					variant="ghost"
					size="lg"
					onClick={() => {
						/* open scoreboard */
					}}
				>
					<CrownIcon />
					Scoreboard
				</Button>
			</div>
		</div>
	);
}
