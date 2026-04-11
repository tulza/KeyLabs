import { capitalize } from "radash";
import { GlobeIcon } from "@/components/icon";
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
	const { wordSet } = usePreGameConfig();

	return (
		<div className="flex flex-wrap gap-2">
			<Drawer>
				<DrawerTrigger asChild>
					<Button variant="ghost" size="lg">
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
							<Button
								key={index}
								variant="ghost"
								size="lg"
								onClick={() => changeWordSet(name as WordSet)}
								className="justify-between rounded-none px-4 duration-0"
							>
								<p>{formatText(name)}</p>
								<p className="text-secondary">{description}</p>
							</Button>
						))}
					</div>
					<hr />
					<DrawerFooter>
						<DrawerClose asChild>
							<Button variant="outline">Close</Button>
						</DrawerClose>
					</DrawerFooter>
				</DrawerContent>
			</Drawer>
		</div>
	);
}

const formatText = (text: string) => capitalize(text).replaceAll("_", " ");
