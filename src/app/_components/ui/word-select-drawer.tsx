import { capitalize } from "radash";
import { useState } from "react";
import { GlobeIcon } from "@/components/icon";
import { useWordSets } from "@/components/provider/wordset";
import { Button } from "@/components/ui/button";
import {
	Drawer,
	DrawerClose,
	DrawerContent,
	DrawerDescription,
	DrawerFooter,
	DrawerHeader,
	DrawerTitle,
	DrawerTrigger,
} from "@/components/ui/drawer";
import { WordSetMeta } from "@/data/sets/word-set-meta";
import { State, WordSet } from "@/lib/game/enum";
import { changeWordSet, usePreGameConfig } from "@/lib/game/store/pre-game";
import { useGameState } from "@/lib/game/store/state-manager";
import { Loader } from "./loader";

export function DrawerWithSides() {
	const wordsetMeta = useWordSets();
	const [loading, setLoading] = useState<number | null>(null);
	const [open, setOpen] = useState(false);
	const state = useGameState();

	const handleSelect = async (name: string, index: number) => {
		if (state !== State.Ready) return;

		setLoading(index);
		await changeWordSet(name as WordSet);
		setOpen(false);
		setLoading(null);
	};
	const { wordSet } = usePreGameConfig();

	return (
		<div className="flex flex-wrap gap-2">
			<Drawer open={open} onOpenChange={setOpen}>
				<DrawerTrigger asChild>
					<Button
						variant="ghost"
						size="lg"
						onClick={() => setOpen(true)}
					>
						<GlobeIcon />
						{formatText(wordSet)}
					</Button>
				</DrawerTrigger>
				<DrawerContent className="mx-auto w-140 self-center bg-background data-[vaul-drawer-direction=bottom]:max-h-[80vh] data-[vaul-drawer-direction=top]:max-h-[80vh]">
					<DrawerHeader>
						<DrawerTitle>Word Sets</DrawerTitle>
						<DrawerDescription>Change word set.</DrawerDescription>
					</DrawerHeader>
					<hr />
					<div className="no-scrollbar flex max-h-100 flex-col overflow-y-auto py-6">
						{wordsetMeta.map((meta, index) => (
							<DrawerSetSelectButton
								key={index}
								wordSetMeta={meta}
								index={index}
								isLoading={loading === index}
								disabled={!!loading}
								onClick={() => handleSelect(meta.name, index)}
							/>
						))}
					</div>
					<hr />
					<DrawerFooter>
						<DrawerClose asChild>
							<Button
								variant="outline"
								onClick={() => setOpen(false)}
							>
								Close
							</Button>
						</DrawerClose>
					</DrawerFooter>
				</DrawerContent>
			</Drawer>
		</div>
	);
}

const DrawerSetSelectButton = ({
	wordSetMeta,
	isLoading,
	disabled,
	onClick,
	index,
}: {
	wordSetMeta: WordSetMeta;
	isLoading: boolean;
	disabled: boolean;
	onClick: () => void;
	index: number;
}) => {
	const {
		name,
		description,
		letterCount: { mean },
	} = wordSetMeta;

	return (
		<Button
			key={index}
			variant="ghost"
			size="lg"
			onClick={onClick}
			disabled={disabled}
			className="justify-between rounded-none px-4 duration-0"
		>
			<p className="flex items-center gap-3 text-foreground">
				{formatText(name)}
				<span className="rounded bg-secondary/80 px-1 text-secondary-foreground text-xs">
					difficulty: {mean}
				</span>
				{isLoading && <Loader className="*:stroke-foreground" />}
			</p>
			<p className="text-secondary">{description}</p>
		</Button>
	);
};

const formatText = (text: string) => capitalize(text).replaceAll("_", " ");
