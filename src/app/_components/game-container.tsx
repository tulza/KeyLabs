import { PropsWithChildren } from "react";
import { cn } from "@/lib/utils";

export const GameContainer = ({
	children,
	className,
}: PropsWithChildren<{ className?: string }>) => {
	return (
		<div className="flex w-full justify-center">
			<div
				className={cn("absolute flex w-200 justify-between", className)}
			>
				{children}
			</div>
		</div>
	);
};
