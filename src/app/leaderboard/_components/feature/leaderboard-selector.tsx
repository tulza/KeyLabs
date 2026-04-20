import { parseAsInteger, useQueryState } from "nuqs";
import { PropsWithChildren } from "react";
import { GlobeIcon, TimeIcon } from "@/components/icon";
import { Button } from "@/components/ui/button";

const leaderboardTime = [15, 30, 60];
const leaderboardWordset = ["english", "any"];

export const LeaderboardSelect = () => {
	const [time, setTime] = useQueryState(
		"time",
		parseAsInteger.withDefault(30),
	);
	const [wordset, setWordset] = useQueryState("wordset", {
		defaultValue: "english",
	});

	return (
		<div className="col-span-3 flex flex-col gap-3">
			{/* <SelectContainer>
                        <Button variant="secondary">All Time</Button>
                        <Button variant="outline">Daily</Button>
                    </SelectContainer>
                    <SelectContainer>
                        <Button variant="secondary">Letter per Minute</Button>
                    </SelectContainer> */}
			<SelectContainer>
				{leaderboardTime.map((t) => (
					<Button
						key={t}
						variant={time === t ? "secondary" : "outline"}
						onClick={() => setTime(t)}
					>
						<TimeIcon />
						Time {t}
					</Button>
				))}
			</SelectContainer>
			<SelectContainer>
				{leaderboardWordset.map((item) => (
					<Button
						key={item}
						onClick={() => setWordset(item)}
						variant={wordset === item ? "secondary" : "outline"}
					>
						<GlobeIcon />
						{item}
					</Button>
				))}
			</SelectContainer>
		</div>
	);
};

const SelectContainer = ({ children }: PropsWithChildren) => {
	return (
		<div className="flex w-full flex-col gap-1 rounded border border-border bg-muted p-1 *:justify-start">
			{children}
		</div>
	);
};
