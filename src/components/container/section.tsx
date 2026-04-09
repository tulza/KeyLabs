import { HTMLAttributes, PropsWithChildren } from "react";
import { cn } from "@/libs/utils/className";

export const Section = ({
	children,
	className,
	...props
}: PropsWithChildren<HTMLAttributes<HTMLElement>>) => {
	return (
		<section
			className={cn(
				"flex w-full flex-col items-center desktop:px-12 px-4 py-12",
				className,
			)}
			{...props}
		>
			{children}
		</section>
	);
};
