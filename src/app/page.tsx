import { PageContainer } from "@/components/container/PageContainer";
import { Confetti } from "@/components/feature/snow-confetti";
import { WordSetProvider } from "@/components/provider/wordset";

import { getWordSetSelection } from "@/data/sets/word-set";
import { Background } from "./_components/feature/background";
import { DisplayCurrentWord } from "./_components/feature/display-current-word";
import { Game } from "./_components/feature/game-board";
import { TargetLayer } from "./_components/feature/target-layer";
import { GameOptionsSelector } from "./_components/ui/gamemode-select";
import { NavigationBar } from "./_components/ui/navigation-bar";

export default async function Home() {
	const wordSetSelectionMeta = await getWordSetSelection();

	return (
		<WordSetProvider value={wordSetSelectionMeta}>
			<Confetti />
			<PageContainer className="overflow-hidden">
				<Background />
				<NavigationBar />
				<Game>
					<TargetLayer />
					<DisplayCurrentWord />
				</Game>
				<GameOptionsSelector />
				{/* debugger */}
				{/* <DebugWindow /> */}
				{/* <StateDebugPanel /> */}
			</PageContainer>
		</WordSetProvider>
	);
}
