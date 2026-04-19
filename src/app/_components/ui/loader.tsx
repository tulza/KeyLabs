import { LoadingIcon } from "@/components/icon";
import { cn } from "@/lib/utils";

export const Loader = (props: React.SVGProps<SVGSVGElement>) => {
	return (
		<LoadingIcon
			{...props}
			className={cn(
				"size-4 animate-spin text-secondary-foreground",
				props.className,
			)}
		/>
	);
};
