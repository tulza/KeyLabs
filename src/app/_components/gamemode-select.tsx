import { PropsWithChildren, useState } from "react";
import { CharacterIcon, TimeIcon } from "@/components/icon";
import { Text } from "@/components/typography/text";
import { Button } from "@/components/ui/button";
import { GameContainer } from "./game-container";

type Mode = "timed" | "character";

const modeOptions = [
	{ value: "timed" as Mode, label: "Timed", icon: TimeIcon },
	{ value: "character" as Mode, label: "Characters", icon: CharacterIcon },
];

const amountOptions: Record<Mode, number[]> = {
	timed: [15, 30, 60, 120],
	character: [30, 50, 100],
};

const AmountIcon: Record<Mode, typeof TimeIcon> = {
	timed: TimeIcon,
	character: CharacterIcon,
};

export const GameOptionsSelector = () => {
	const [mode, setMode] = useState<Mode>("timed");
	const [amount, setAmount] = useState<number>(amountOptions["timed"][0]);

	const handleModeChange = (newMode: Mode) => {
		setMode(newMode);
		setAmount(amountOptions[newMode][0]);
	};

	const Icon = AmountIcon[mode];

	return (
		<GameContainer className="bottom-0 flex gap-6">
			<div className="flex gap-6">
				<Menu label="Gamemode">
					{modeOptions.map(({ value, label, icon: ModeIcon }) => (
						<Button
							key={`mode-${value}`}
							variant={mode === value ? "secondary" : "outline"}
							className={`tabular rounded border-2`}
							size="lg"
							onClick={() => handleModeChange(value)}
						>
							<ModeIcon />
							<span>{label}</span>
						</Button>
					))}
				</Menu>

				<Menu
					label={mode === "timed" ? "No. seconds" : "No. characters"}
				>
					{amountOptions[mode].map((value) => (
						<Button
							key={`${mode}-${value}`}
							variant={amount === value ? "secondary" : "outline"}
							className={`tabular rounded border-2 font-mono font-normal`}
							size="lg"
							onClick={() => setAmount(value)}
						>
							<Icon />
							<span>{value}</span>
						</Button>
					))}
				</Menu>
			</div>
		</GameContainer>
	);
};

const Menu = ({ children, label }: PropsWithChildren<{ label: string }>) => {
	return (
		<div className="relative flex h-min gap-2 rounded-tr-md border-secondary bg-secondary p-0.5 pb-0">
			<div className="absolute bottom-full left-0 rounded-t bg-secondary px-2 pt-1 font-serif italic">
				<Text size="small">{label}</Text>
			</div>
			<div className="flex gap-2 rounded-t-[6px] bg-[color-mix(in_srgb,var(--color-background),var(--color-secondary)_15%)] p-3 pb-4">
				{children}
			</div>
		</div>
	);
};
