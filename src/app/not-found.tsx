import Link from "next/link";
import { LeftArrowIcon } from "@/components/icon";
import { Button } from "@/components/ui/button";

export default function NotFound() {
	return (
		<div className="flex min-h-dvh flex-col items-center justify-center gap-3">
			<div className="flex flex-col items-center gap-1">
				<h1 className="font-serif text-4xl italic">404</h1>
				<p className="text-lg text-muted-foreground tracking-tight">
					Page not found
				</p>
				<Button
					variant="secondary"
					className="mt-3 w-full gap-2"
					asChild
				>
					<Link href="/">
						<LeftArrowIcon className="size-5" />
						<span>Go Back</span>
					</Link>
				</Button>
			</div>
		</div>
	);
}
