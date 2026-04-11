import { capitalize } from "radash";
import { useState } from "react";
import { GlobeIcon, LoadingIcon } from "@/components/icon";
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
import { setMeta } from "@/data/sets/word-set";
import { WordSet } from "@/lib/game/enum";
import { changeWordSet, usePreGameConfig } from "@/lib/game/store/pre-game";

export function DrawerWithSides() {
	const [loading, setLoading] = useState<number | null>(null);
	const [open, setOpen] = useState(false);

	const handleSelect = async (name: string, index: number) => {
		setLoading(index);
		await changeWordSet(name as WordSet);
		setOpen(false);
		setLoading(null);
	};
	const { wordSet } = usePreGameConfig();

	return (
		<div className="flex flex-wrap gap-2">
			<Drawer open={open} onOpenChange={setOpen}>
				<DrawerTrigger>
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
					<div className="no-scrollbar flex flex-col overflow-y-auto py-6">
						{setMeta.map(({ name, description }, index) => (
							<DrawerSetSelectButton
								key={index}
								name={name}
								description={description}
								index={index}
								isLoading={loading === index}
								disabled={!!loading}
								onClick={() => handleSelect(name, index)}
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
	name,
	description,
	isLoading,
	disabled,
	onClick,
	index,
}: {
	name: string;
	description?: string;
	isLoading: boolean;
	disabled: boolean;
	onClick: () => void;
	index: number;
}) => {
	return (
		<Button
			key={index}
			variant="ghost"
			size="lg"
			onClick={onClick}
			disabled={disabled}
			className="justify-between rounded-none px-4 duration-0"
		>
			<p className="flex items-center gap-3">
				{formatText(name)}
				{isLoading && (
					<LoadingIcon className="size-4 animate-spin *:stroke-foreground" />
				)}
			</p>
			<p className="text-secondary">{description}</p>
		</Button>
	);
};

const formatText = (text: string) => capitalize(text).replaceAll("_", " ");
