import { AnimatePresence, motion, Variants } from "motion/react";
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
import { ease } from "@/lib/utils/ease";
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

	const currentMode = config?.mode ?? Mode.time;
	const currentAmount = config?.mode2 ?? modeOptions[Mode.time][0];

	const Icon = AmountIcon[currentMode];

	const isCustom = !modeOptions[currentMode].includes(currentAmount);
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
				<AnimatePresence mode="wait" initial={false}>
					<Menu key="mode-select" label="Gamemode">
						{modes.map(({ value, label, icon: Icon }) => (
							<SelectButton
								key={`${currentMode}-${value}`}
								current={currentMode}
								value={value}
								label={label}
								onClick={() => handleModeChange(value)}
								icon={Icon}
							/>
						))}
					</Menu>
				</AnimatePresence>
				<AnimatePresence mode="wait" initial={false}>
					<Menu
						key={currentMode}
						label={
							currentMode === Mode.time
								? "No. seconds"
								: "No. characters"
						}
					>
						{modeOptions[currentMode].map((value) => (
							<SelectButton
								current={currentAmount}
								value={value}
								label={value.toString()}
								onClick={() => handleMode2Change(value)}
								icon={Icon}
							/>
						))}
						<Mode2CustomDialog isCustom={isCustom} />
					</Menu>
				</AnimatePresence>
			</div>
		</GameContainer>
	);
};

const Menu = ({ children, label }: PropsWithChildren<{ label: string }>) => {
	return (
		<motion.div
			variants={menuVariant}
			initial="initial"
			animate="animate"
			exit="exit"
			className="relative flex h-min gap-2 rounded-tr-md border-secondary bg-secondary p-0.5 pb-0"
		>
			<div className="absolute bottom-full left-0 rounded-t bg-secondary px-2 pt-1 font-serif text-secondary-foreground italic">
				<Text size="small">{label}</Text>
			</div>
			<div className="flex gap-2 rounded-t-[6px] bg-[color-mix(in_srgb,var(--color-background),var(--color-secondary)_15%)] p-3 pb-4">
				{children}
			</div>
		</motion.div>
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
			onClick={() => onClick(value)}
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

const menuVariant: Variants = {
	initial: { y: 40, opacity: 0 },
	animate: {
		y: 0,
		opacity: 1,
		transition: { duration: 0.25, ease: ease.outQuad },
	},
	exit: {
		y: 40,
		opacity: 0,
		transition: { duration: 0.15, ease: ease.inQuad },
	},
};
