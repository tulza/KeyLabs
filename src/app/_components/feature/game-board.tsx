import { PropsWithChildren, useEffect, useRef } from "react";
import { Mode, State } from "@/lib/game/enum";
import { usePreGameStore } from "@/lib/game/store/pre-game";
import {
	hasFinished,
	initializeFirstLoad,
	isPregame,
	transition,
	useGameState,
} from "@/lib/game/store/state-manager";
import { DrawerWithSides } from "../ui/word-select-drawer";
import { GameBar } from "./game-bar";
import { SummaryScreen } from "./game-summary";
import { Screen } from "./screen";

export const Game = ({ children }: PropsWithChildren) => {
	const rafRef = useRef<number>(0);
	const { mode } = usePreGameStore().config;

	const state = useGameState();

	useEffect(() => {
		document.addEventListener("keydown", (event) => {
			if (event.key.toLocaleLowerCase() === "r") {
				if (state !== State.Resetting) return;
				transition(State.Resetting);
			}
		});

		initializeFirstLoad();
	}, []);

	useEffect(() => {
		if (state !== State.Playing) return;
		if (mode !== Mode.time) return;

		const checkFinished = () => {
			hasFinished();
			rafRef.current = requestAnimationFrame(checkFinished);
		};

		rafRef.current = requestAnimationFrame(checkFinished);
		return () => cancelAnimationFrame(rafRef.current);
	}, [state, mode]);

	if (state === State.Finished)
		return (
			<GameBoardContainer>
				<SummaryScreen />
			</GameBoardContainer>
		);

	return (
		<GameBoardContainer>
			<GameBar />
			<Screen>{children}</Screen>
			<div className="flex h-9 w-225 items-center justify-center">
				{isPregame() && <DrawerWithSides />}
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
