import { PropsWithChildren, useEffect } from "react";
import { State } from "@/lib/game/enum";
import {
	initializeFirstLoad,
	transition,
	useGameState,
} from "@/lib/game/store/state-manager";
import { DrawerWithSides } from "../ui/word-select-drawer";
import { GameBar } from "./game-bar";
import { Screen } from "./screen";

export const Game = ({ children }: PropsWithChildren) => {
	// todo: toggle between screen
	const state = useGameState();

	useEffect(() => {
		document.addEventListener("keydown", (event) => {
			if (event.key.toLocaleLowerCase() === "r") {
				transition(State.Resetting);
			}
		});

		initializeFirstLoad();
	}, []);

	return (
		<GameBoardContainer>
			<GameBar />
			<Screen>{children}</Screen>
			<div className="flex w-225 items-center justify-center">
				<DrawerWithSides />
			</div>
		</GameBoardContainer>
	);
};

const GameBoardContainer = ({ children }: PropsWithChildren) => {
	return (
		<div className="flex size-full grow items-center justify-center">
			<div className="flex flex-col items-center gap-6">{children}</div>
		</div>
	);
};
