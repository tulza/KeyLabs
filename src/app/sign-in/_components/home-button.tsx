import { Link } from "@tanstack/react-router";
import { LeftArrowIcon } from "@/components/icon";
import { Button } from "@/components/ui/button";

export const BackHomeButton = () => {
	return (
		<Button variant="ghost" className="w-full gap-2" asChild>
			<Link to="/">
				<LeftArrowIcon className="size-5 *:stroke-foreground" />
				<span>Home</span>
			</Link>
		</Button>
	);
};
