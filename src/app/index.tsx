import { createFileRoute } from "@tanstack/react-router";
import { PageContainer } from "@/components/container/PageContainer";
import { Section } from "@/components/container/section";
import ColorModes from "./color/components/ui/picker";
import { ColorProvider } from "./color/components/ui/provider/color-provider";

export const Route = createFileRoute("/")({
	component: Home,
});

function Home() {
	return (
		<ColorProvider>
			<PageContainer>
				<Section>
					<div className="flex w-200 gap-3">
						<div className="hsl-square -p-px m-px aspect-square min-w-52 outline outline-zinc-300" />
						<div className="flex w-full flex-col gap-4">
							<ColorModes mode="hsl" />
						</div>
					</div>
				</Section>
			</PageContainer>
		</ColorProvider>
	);
}
