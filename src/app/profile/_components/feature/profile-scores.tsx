import { User } from "better-auth";
import { PropsWithChildren } from "react";
import { SignOutButton } from "@/app/sign-in/_components/sign-out";
import { CharacterIcon, TimeIcon } from "@/components/icon";
import { Mode } from "@/lib/game/enum";
import { UserPersonalBestScore } from "@/server/types/game-result";

export const ProfileScore = ({
	user,
	scores,
}: {
	user: User;
	scores: UserPersonalBestScore[];
}) => {
	return (
		<ProfileContainer>
			<div className="mb-12 flex h-full w-full max-w-page grow flex-col gap-12 self-center">
				<h3 className="font-serif text-3xl">Your Profile</h3>
				<div className="grid grid-cols-4 gap-3">
					<Score mode={Mode.time} mode2={15} scores={scores} />
					<Score mode={Mode.time} mode2={30} scores={scores} />
					<Score mode={Mode.time} mode2={60} scores={scores} />
					<Score mode={Mode.time} mode2={120} scores={scores} />
					<Score mode={Mode.characters} mode2={30} scores={scores} />
					<Score mode={Mode.characters} mode2={50} scores={scores} />
					<Score mode={Mode.characters} mode2={100} scores={scores} />
					<Score mode={Mode.characters} mode2={200} scores={scores} />
				</div>
				<SignOutButton className="w-min px-12" />
			</div>
		</ProfileContainer>
	);
};

const Score = ({
	mode,
	mode2,
	scores,
}: {
	mode: string;
	mode2: number;
	scores: UserPersonalBestScore[];
}) => {
	const score =
		scores.find((s) => s.mode === mode && s.mode2 === mode2) || null;

	const label = `${mode2} ${mode === Mode.time ? "seconds" : "letters"}`;
	const Icon = mode === Mode.time ? TimeIcon : CharacterIcon;
	const lpm = (score && Math.floor(score.lpm)) || "-";
	const acc = (score && `${(score.accuracy * 100).toFixed(0)}%`) || "";

	return (
		<ScoreContainer>
			<div className="absolute top-2 left-2 flex aspect-square size-8 items-center justify-center rounded p-1 text-foreground">
				<Icon />
			</div>
			<p className="text-xs">{label}</p>
			<p className="font-serif text-3xl">{lpm}</p>
			<p className="">{acc}</p>
		</ScoreContainer>
	);
};

const ScoreContainer = ({ children }: PropsWithChildren) => {
	return (
		<div className="relative flex size-full flex-col items-center gap-1 rounded bg-secondary p-3 font-medium text-secondary-foreground">
			{children}
		</div>
	);
};

const ProfileContainer = ({ children }: PropsWithChildren) => {
	return (
		<div className="mt-32 flex size-full grow flex-col gap-6 self-center px-12">
			{children}
		</div>
	);
};
