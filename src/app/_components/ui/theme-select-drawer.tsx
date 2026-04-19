import { capitalize } from "radash";
import { ButtonHTMLAttributes, useState } from "react";
import { ThemeIcon } from "@/components/icon";
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
import { Preview, themePreview } from "@/data/themes/preview";
import { useTheme } from "@/lib/game/store/theme";
import { Loader } from "./loader";

export function ThemeSelectDrawer(
	props: ButtonHTMLAttributes<HTMLButtonElement>,
) {
	const [loading, setLoading] = useState<number | null>(null);
	const [open, setOpen] = useState(false);
	const { theme, handleSetTheme } = useTheme();

	const handleSelect = async (theme: string, index: number) => {
		setLoading(index);
		await handleSetTheme(theme);
		setOpen(false);
		setLoading(null);
	};

	return (
		<div className="flex flex-wrap gap-2">
			<Drawer open={open} onOpenChange={setOpen} direction="top">
				<DrawerTrigger asChild>
					<Button
						variant="secondary"
						size="icon"
						{...props}
						onClick={(e) => {
							setOpen(true);
							props.onClick?.(e);
						}}
					>
						<ThemeIcon className="size-5" />
					</Button>
				</DrawerTrigger>
				<DrawerContent className="mx-auto w-140 self-center bg-background data-[vaul-drawer-direction=bottom]:max-h-[80vh] data-[vaul-drawer-direction=top]:max-h-[80vh]">
					<DrawerHeader>
						<DrawerTitle>Themes</DrawerTitle>
						<DrawerDescription>
							Click on a theme you like to change to!
						</DrawerDescription>
					</DrawerHeader>
					<hr />
					<div className="no-scrollbar flex max-h-100 flex-col overflow-y-auto py-6">
						{themePreview.map((preview, index) => (
							<DrawerSetSelectButton
								key={index}
								preview={preview}
								index={index}
								isLoading={loading === index}
								disabled={!!loading}
								onClick={() => handleSelect(preview.id, index)}
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
	preview,
	isLoading,
	disabled,
	onClick,
	index,
}: {
	preview: Preview;
	isLoading: boolean;
	disabled: boolean;
	onClick: () => void;
	index: number;
}) => {
	const { background, color1, color3, color2 } = preview.preview;

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
				{formatText(preview.name)}
				{isLoading && <Loader />}
			</p>
			<div
				style={{ background }}
				className="flex gap-1 p-1 outline *:size-4"
			>
				<div style={{ background: color1 }} />
				<div style={{ background: color2 }} />
				<div style={{ background: color3 }} />
			</div>
		</Button>
	);
};

const formatText = (text: string) => capitalize(text).replaceAll("_", " ");
