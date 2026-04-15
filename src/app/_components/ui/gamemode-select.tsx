import { PropsWithChildren } from "react";
import { CharacterIcon, TimeIcon } from "@/components/icon";
import { Text } from "@/components/typography/text";
import { Button } from "@/components/ui/button";
import { Mode } from "@/lib/game/enum";
import { modeOptions } from "@/lib/game/options";
import {
	handleMode2Change,
	handleModeChange,
	usePreGameConfig,
} from "@/lib/game/store/pre-game";
import { isPregame } from "@/lib/game/store/state-manager";
import { cn } from "@/lib/utils";
import { GameContainer } from "./game-container";
import { Mode2CustomDialog } from "./mode2-custom-dialog";

const modes = [
	{ value: Mode.time, label: "Timed", icon: TimeIcon },
	{ value: Mode.characters, label: "Characters", icon: CharacterIcon },
];

const AmountIcon: Record<Mode, typeof TimeIcon> = {
	time: TimeIcon,
	characters: CharacterIcon,
};

export const GameOptionsSelector = () => {
	const config = usePreGameConfig();

	const mode = config?.mode ?? Mode.time;
	const amount = config?.mode2 ?? modeOptions[Mode.time][0];

	const Icon = AmountIcon[mode];

	const isCustom = !modeOptions[mode].includes(amount);
	return (
		<GameContainer className="bottom-0 flex gap-6">
			<div
				className={cn(
					"flex gap-6 opacity-100",
					!isPregame() && "pointer-events-none",
					// temp
					!isPregame() && "opacity-0",
				)}
			>
				<Menu label="Gamemode">
					{modes.map(({ value, label, icon: Icon }) => (
						<SelectButton
							key={`${mode}-${value}`}
							current={mode}
							value={value}
							label={label}
							onClick={() => handleModeChange(value)}
							icon={Icon}
						/>
					))}
				</Menu>

				<Menu
					label={
						mode === Mode.time ? "No. seconds" : "No. characters"
					}
				>
					{modeOptions[mode].map((value) => (
						<SelectButton
							key={`${mode}-${value}`}
							current={amount}
							value={value}
							label={value.toString()}
							onClick={() => handleMode2Change(value)}
							icon={Icon}
						/>
					))}
					<Mode2CustomDialog
						key={`${mode}-custom`}
						isCustom={isCustom}
					/>
				</Menu>
			</div>
		</GameContainer>
	);
};

const Menu = ({ children, label }: PropsWithChildren<{ label: string }>) => {
	return (
		<div className="relative flex h-min gap-2 rounded-tr-md border-secondary bg-secondary p-0.5 pb-0">
			<div className="absolute bottom-full left-0 rounded-t bg-secondary px-2 pt-1 font-serif text-secondary-foreground italic">
				<Text size="small">{label}</Text>
			</div>
			<div className="flex gap-2 rounded-t-[6px] bg-[color-mix(in_srgb,var(--color-background),var(--color-secondary)_15%)] p-3 pb-4">
				{children}
			</div>
		</div>
	);
};

const SelectButton = <T extends Mode | number>({
	current,
	value,
	label,
	icon,
	onClick,
}: {
	current: T;
	value: T;
	label: string;
	icon: typeof TimeIcon;
	onClick: (mode: T) => void;
}) => {
	const Icon = icon;

	return (
		<Button
			key={`${value}-${label}`}
			variant={current === value ? "secondary" : "muted"}
			className="rounded font-mono font-normal tabular-nums"
			size="lg"
			onClick={() => onClick(current)}
		>
			<Icon
				className={cn(
					current === value && "*:fill-secondary-foreground",
				)}
			/>
			<span>{label}</span>
		</Button>
	);
};
