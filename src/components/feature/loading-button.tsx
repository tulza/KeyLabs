import { ComponentProps } from "react";
import { LoadingIcon } from "@/components/icon";
import { Button } from "@/components/ui/button";

type LoadingButtonProps = ComponentProps<typeof Button> & {
	isLoading?: boolean;
};

export const LoadingButton = ({
	isLoading,
	disabled,
	children,
	...props
}: LoadingButtonProps) => {
	return (
		<Button disabled={isLoading || disabled} {...props}>
			{isLoading && <LoadingIcon className="size-4 animate-spin" />}
			{children}
		</Button>
	);
};
