import { VariantProps } from "class-variance-authority";
import { PropsWithChildren } from "react";
import { CursorIcon, GlobeIcon, ResetIcon } from "@/components/icon";
import { PieTimer } from "@/components/icon/pie";
import { Button, buttonVariants } from "@/components/ui/button";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

const screen = { width: 15 * 60, height: 9 * 60 };

export const GameBoard = ({ children }: PropsWithChildren) => {
	return (
		<div className="flex size-full grow items-center justify-center">
			<div className="flex flex-col items-center gap-6">
				<GameBar />
				<Screen />
				<div className="w-225">
					<NotButton icon={GlobeIcon} variant="secondary" size="lg">
						English 5k
					</NotButton>
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
						className="absolute inset-1/2 flex size-16 cursor-pointer items-center justify-center rounded-full bg-foreground [translate:-50%_-50%]"
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

const Screen = () => {
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

			<StartCircle />
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
			<div />
			<Button variant="secondary" size="icon" className="place-self-end">
				<ResetIcon />
			</Button>
		</div>
	);
};
