import { createFileRoute } from "@tanstack/react-router";
import { PageContainer } from "@/components/container/PageContainer";
import { Background } from "./_components/feature/background";
import { Game } from "./_components/feature/game-board";
import { StateDebugPanel } from "./_components/feature/state-debug";
import { DebugWindow } from "./_components/feature/store-debug";
import { TargetLayer } from "./_components/feature/target-layer";
import { GameOptionsSelector } from "./_components/ui/gamemode-select";
import { NavigationBar } from "./_components/ui/navigation-bar";
export const Route = createFileRoute("/")({
	component: Home,
});

function Home() {
	return (
		<PageContainer className="overflow-hidden">
			<Background />
			<NavigationBar />
			<Game>
				<TargetLayer />
			</Game>
			<GameOptionsSelector />
			{/* debugger */}
			<DebugWindow />
			<StateDebugPanel />
		</PageContainer>
	);
}
