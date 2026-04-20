"use client";

import { createParser, parseAsInteger, useQueryState } from "nuqs";
import { capitalize } from "radash";
import { Loader } from "@/app/_components/ui/loader";
import api, { useQuery } from "@/lib/eden";
import { Mode } from "@/lib/game/enum";
import { pbAllowedWordsets } from "@/server/data/pb-allowed";
import { LeaderboardListResponse } from "@/server/leaderboard";
import { LeaderboardSelect } from "./leaderboard-selector";

const parseAsAllowedTime = parseAsInteger.withDefault(30);

const parseAsWordset = createParser({
	parse: (value) => (pbAllowedWordsets.includes(value) ? value : null),
	serialize: (value) => value,
}).withDefault("english");

export const LeaderboardScore = () => {
	const [time] = useQueryState("time", parseAsAllowedTime);
	const [wordset] = useQueryState("wordset", parseAsWordset);

	const { data, isPending } = useQuery(["leaderboard", time, wordset], () =>
		api.leaderboard.post({
			mode: Mode.time,
			mode2: time,
			wordset,
		}),
	);

	return (
		<div className="mb-12 grid h-full grow grid-cols-12 gap-12">
			<LeaderboardSelect />
			<div className="col-span-9 size-full h-full rounded">
				<div className="mb-3">
					<h3 className="h-9 font-serif text-3xl">
						{capitalize(wordset)} Time {time} Top Circle Clickers
					</h3>
				</div>
				<LeaderboardList
					isLoading={isPending}
					scores={data ?? []}
					wordset={wordset}
				/>
			</div>
		</div>
	);
};

const LEADERBOARD_SIZE = 10;

const LeaderboardList = ({
	scores,
	isLoading,
	wordset,
}: {
	scores: LeaderboardListResponse;
	isLoading: boolean;
	wordset: string;
}) => {
	const rows = Array.from(
		{ length: LEADERBOARD_SIZE },
		(_, i) => scores[i] ?? null,
	);
	const showWordset = wordset === "any";

	return (
		<div className="size-full">
			<table className="w-full table-fixed text-sm">
				<thead>
					<tr className="border-border border-b text-left font-medium text-foreground/50 *:p-3">
						<th className="w-[5%]">
							{isLoading && (
								<Loader className="text-foreground" />
							)}
						</th>
						<th className={showWordset ? "w-[55%]" : "w-[75%]"}>
							name
						</th>
						{showWordset && <th className="w-[20%]">wordset</th>}
						<th className="w-[10%] text-right">acc</th>
						<th className="w-[10%] text-right">lpm</th>
					</tr>
				</thead>
				<tbody>
					{rows.map((score, index) => (
						<tr
							key={index}
							className="border-border border-b even:bg-secondary/10"
						>
							<td className="p-3 text-icon">{index + 1}</td>
							<td className="p-3 font-medium">
								{score ? (score.user?.name ?? "Anonymous") : ""}
							</td>
							{showWordset && (
								<td className="p-3 text-icon">
									{score ? score.wordSet : ""}
								</td>
							)}
							<td className="p-3 text-right text-icon">
								{score
									? `${(score.accuracy * 100).toFixed(0)}%`
									: ""}
							</td>
							<td className="p-3 text-right font-medium">
								{score ? score.lpm.toFixed(2) : ""}
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};
