import Link from "next/link";
import { LeftArrowIcon } from "@/components/icon";
import { Button } from "@/components/ui/button";

export const BackHomeButton = () => {
	return (
		<Button variant="ghost" className="w-full gap-2" asChild>
			<Link href="/">
				<LeftArrowIcon className="size-5" />
				<span>Home</span>
			</Link>
		</Button>
	);
};
