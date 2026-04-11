import { VariantProps } from "class-variance-authority";
import { PropsWithChildren, useEffect, useRef, useState } from "react";
import { CursorIcon, ResetIcon } from "@/components/icon";
import { PieTimer } from "@/components/icon/pie";
import { Button, buttonVariants } from "@/components/ui/button";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/ui/tooltip";
import { screen } from "@/lib/game/config";
import { useWordIndex } from "@/lib/game/store/game";
import {
	usePreGameConfig,
	usePreGameWordList,
} from "@/lib/game/store/pre-game";
import { Point } from "@/lib/game/types";
import { cn } from "@/lib/utils";
import { DrawerWithSides } from "./wordSetDrawer";

export const GameBoard = () => {
	const [stack, setStack] = useState<Point[]>([]);

	return (
		<div className="flex size-full grow items-center justify-center">
			<div className="flex flex-col items-center gap-6">
				<GameBar />
				<Screen>
					<StartCircle />
					{stack.map((point) => (
						<HitCircle key={point.id} point={point} />
					))}
				</Screen>
				<div className="flex w-225 items-center justify-center">
					<DrawerWithSides />
					{/* <Button variant="secondary" size="lg">
						<GlobeIcon />
						English 5k
					</Button> */}
				</div>
			</div>
		</div>
	);
};

type NotButtonProps = {
	icon?: React.ComponentType<React.SVGProps<SVGSVGElement>>;
	className?: string;
} & VariantProps<typeof buttonVariants>;

const NotButton = ({
	icon: Icon,
	variant,
	size,
	className,
	children,
	...props
}: React.PropsWithChildren<NotButtonProps>) => {
	return (
		<div
			className={cn(
				buttonVariants({ variant, size }),
				"bg-muted hover:bg-muted",
				className,
			)}
			{...props}
		>
			{Icon && <Icon className="size-4" />}
			{children}
		</div>
	);
};

const StartCircle = () => {
	return (
		<TooltipProvider>
			<Tooltip>
				<TooltipTrigger asChild>
					<button
						data-slot="circle"
						className="absolute inset-1/2 z-50 flex size-16 cursor-pointer items-center justify-center rounded-full bg-foreground [translate:-50%_-50%]"
					>
						<div className="-z-10 absolute inset-1/2 size-3/4 animate-ping rounded-full bg-foreground [translate:-50%_-50%]" />
						<CursorIcon className="size-5 *:fill-muted" />
					</button>
				</TooltipTrigger>
				<TooltipContent>Start Test</TooltipContent>
			</Tooltip>
		</TooltipProvider>
	);
};

const HitCircle = ({ point }: { point: Point }) => {
	return (
		<div
			style={{
				left: point.x,
				top: point.y,
			}}
			className="pointer-events-none absolute flex size-16 items-center justify-center rounded-full bg-icon font-mono text-muted text-xl [translate:-50%_-50%]"
		>
			{point.value}
		</div>
	);
};

const Screen = ({ children }: PropsWithChildren) => {
	return (
		<div
			className="relative rounded-md border-2 border-border bg-muted"
			style={{
				width: screen.width,
				height: screen.height,
				minWidth: screen.width,
				minHeight: screen.height,
			}}
		>
			<div className="grid-100 absolute top-0 left-0 size-full bg-center bg-secondary object-center" />
			{/* <StartCircle /> */}
			{children}
		</div>
	);
};

export const GameBar = () => {
	return (
		<div className="grid w-225 grid-cols-[120px_1fr_120px] gap-24">
			<div className="flex h-10 max-h-10 items-center gap-3 rounded border-2 border-secondary bg-muted px-3 font-mono font-normal text-icon">
				<PieTimer duration={30} className="size-5 min-w-5" />
				24.05s
			</div>
			<WordBar />
			<Button variant="secondary" size="icon" className="place-self-end">
				<ResetIcon />
			</Button>
		</div>
	);
};

export const WordBar = () => {
	const refs = useRef<HTMLDivElement[]>([]);
	const [offset, setOffset] = useState(0);

	const { wordSet } = usePreGameConfig();

	const wordList = usePreGameWordList();
	const { charIndex, wordIndex } = useWordIndex();

	useEffect(() => {
		const ref = refs.current[wordIndex];
		if (!ref) return;
		const totalOffset = refs.current
			.slice(0, wordIndex + 1)
			.reduce((acc, el) => acc + el.getBoundingClientRect().width, 0);
		setOffset(totalOffset - ref.getBoundingClientRect().width / 2);
	}, [wordIndex, wordSet]);

	return (
		<div className="relative flex h-10 w-full select-none overflow-hidden rounded border-2 border-secondary bg-muted shadow-inner shadow-secondary">
			<div className="-translate-x-1/2 absolute bottom-0 left-1/2 z-50 translate-y-1 text-[8px]">
				▲
			</div>
			<div
				className="absolute top-0 left-1/2 flex h-full w-min"
				style={{ transform: `translateX(-${offset}px)` }}
			>
				{wordList.words.map((word, i) => (
					<div
						key={`${i}/${word}`}
						ref={(el) => {
							if (!el) return;
							refs.current[i] = el;
						}}
						className={cn(
							"last-border-r flex h-full items-center gap-3 border-secondary border-r bg-muted px-3 font-mono font-normal text-icon first:border-l",
							i > wordIndex && "text-secondary",
						)}
					>
						{word}
					</div>
				))}
			</div>
		</div>
	);
};
