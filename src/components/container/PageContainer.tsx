import { PropsWithChildren } from "react";
import { cn } from "@/lib/utils";

export const PageContainer = ({
	children,
	className,
}: PropsWithChildren<{ className?: string }>) => {
	return (
		<main
			className={cn(
				"relative flex size-full min-h-dvh flex-col",
				className,
			)}
		>
			{children}
		</main>
	);
	1;
};
