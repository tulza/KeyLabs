import { PageContainer } from "@/components/container/PageContainer";
import { Background } from "../_components/feature/background";
import { NavigationBar } from "../_components/ui/navigation-bar";
import { LeaderboardScore } from "./_components/feature/leaderboard-score";

export default async function LeaderboardPage() {
	return (
		<PageContainer className="overflow-hidden">
			<Background />
			<NavigationBar />
			<Leaderboard />
		</PageContainer>
	);
}

const Leaderboard = () => {
	return (
		<div className="mt-32 flex size-full w-full max-w-300 grow flex-col gap-6 self-center px-12">
			<LeaderboardScore />
		</div>
	);
};
