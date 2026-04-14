"use client";

import { Activity, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { State } from "@/lib/game/enum";
import { transition, useGameState } from "@/lib/game/store/state-manager";
import { cn } from "@/lib/utils";

const states = [State.Resetting, State.Ready, State.Playing, State.Finished];

const stateColor: Record<State, string> = {
	[State.Resetting]: "bg-yellow-100 text-yellow-800",
	[State.Ready]: "bg-blue-100 text-blue-800",
	[State.Playing]: "bg-green-100 text-green-800",
	[State.Finished]: "bg-gray-100 text-gray-800",
};

export function StateDebugPanel() {
	const [open, setOpen] = useState(false);
	const current = useGameState();

	if (process.env.NODE_ENV === "production") return null;

	return (
		<div className="fixed top-3 right-3 z-9999 w-72 rounded bg-muted/80 font-mono text-primary text-xs backdrop-blur-sm">
			<div className="flex items-center justify-between border-border border-b px-3 py-2">
				<span className="text-[10px] tracking-widest">STATE</span>
				<div className="flex items-center gap-1">
					<Badge
						className={cn(stateColor[current], "h-full rounded-xs")}
					>
						{current}
					</Badge>
					<Button
						variant="secondary"
						size="icon-xs"
						onClick={() => setOpen(!open)}
					>
						{open ? "-" : "+"}
					</Button>
				</div>
			</div>
			<Activity mode={open ? "visible" : "hidden"}>
				<div className="flex flex-col gap-1 p-2">
					{states.map((s) => (
						<Button
							key={s}
							variant={current === s ? "secondary" : "outline"}
							size="sm"
							className="w-full justify-start text-xs"
							onClick={() => transition(s)}
						>
							{s}
						</Button>
					))}
				</div>
			</Activity>
		</div>
	);
}
