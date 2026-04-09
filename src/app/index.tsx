import { createFileRoute } from "@tanstack/react-router";
import { PageContainer } from "@/components/container/PageContainer";
import { Section } from "@/components/container/section";

export const Route = createFileRoute("/")({
	component: Home,
});

function Home() {
	return (
		<PageContainer>
			<Section>
				<div className="hsl-square -p-px m-px size-52 outline outline-zinc-300" />
			</Section>
		</PageContainer>
	);
}
