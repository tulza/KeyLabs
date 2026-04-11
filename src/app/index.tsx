import { createFileRoute } from "@tanstack/react-router";
import { Image } from "@unpic/react";
import { PageContainer } from "@/components/container/PageContainer";
import { GameBoard } from "./_components/game-board";
import { GameOptionsSelector } from "./_components/gamemode-select";
import { NavigationBar } from "./_components/navigation-bar";
export const Route = createFileRoute("/")({
	component: Home,
});

function Home() {
	return (
		<PageContainer className="overflow-hidden">
			<Image
				className="-z-10 pointer-events-none absolute top-0 left-0 size-[150%] object-cover object-bottom"
				src="show.png"
				layout="fullWidth"
				height={800}
			/>
			<NavigationBar />
			<GameBoard></GameBoard>
			<GameOptionsSelector />
		</PageContainer>
	);
}
