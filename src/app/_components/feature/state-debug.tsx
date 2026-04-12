// components/debug/StateDebugPanel.tsx
"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { State } from "@/lib/game/enum";
import { transition, useGameState } from "@/lib/game/store/state-manager";

const states = [State.Resetting, State.Ready, State.Playing, State.Finished];

const stateColor: Record<State, string> = {
	[State.Resetting]: "bg-yellow-100 text-yellow-800",
	[State.Ready]: "bg-blue-100 text-blue-800",
	[State.Playing]: "bg-green-100 text-green-800",
	[State.Finished]: "bg-gray-100 text-gray-800",
};

export function StateDebugPanel() {
	const current = useGameState();

	if (process.env.NODE_ENV === "production") return null;

	return (
		<div className="fixed top-4 right-4 z-50 w-48">
			<Card className="shadow-md">
				<CardHeader className="px-3 pt-3 pb-2">
					<CardTitle className="text-muted-foreground text-xs uppercase tracking-wide">
						State debug
					</CardTitle>
					<Badge className={stateColor[current]}>{current}</Badge>
				</CardHeader>
				<CardContent className="flex flex-col gap-1 px-3 pb-3">
					{states.map((s) => (
						<Button
							key={s}
							variant={current === s ? "default" : "outline"}
							size="sm"
							className="w-full justify-start text-xs"
							onClick={() => transition(s)}
						>
							{s}
						</Button>
					))}
				</CardContent>
			</Card>
		</div>
	);
}
