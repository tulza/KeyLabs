import { VariantProps } from "class-variance-authority";
import { PropsWithChildren } from "react";
import { TimeIcon } from "@/components/icon";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const screen = { width: 15 * 60, height: 9 * 60 };

export const GameBoard = ({ children }: PropsWithChildren) => {
	return (
		<div className="flex size-full grow items-center justify-center">
			<div className="flex flex-col gap-6">
				<div className="w-200">
					<NotButton
						icon={TimeIcon}
						variant="secondary"
						size="icon"
					/>
				</div>
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
					<div
						data-slot="circle"
						className="absolute inset-1/2 size-12 rounded-full bg-foreground [translate:-50%_-50%]"
					/>
					{children}
				</div>
				<div className="w-200">
					<NotButton icon={TimeIcon} variant="secondary">
						English 5k
					</NotButton>
				</div>
			</div>
		</div>
	);
};

type NotButtonProps = {
	icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
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
			className={cn(buttonVariants({ variant, size }), className)}
			{...props}
		>
			<Icon className="size-5" />
			{children}
		</div>
	);
};
