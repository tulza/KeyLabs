import { createFileRoute } from "@tanstack/react-router";
import { SocialLoginButtons } from "@/components/auth/social-login-buttons";
import { PageContainer } from "@/components/container/PageContainer";
import { Section } from "@/components/container/section";
import { Text } from "@/components/typography/text";

export const Route = createFileRoute("/")({
	component: Home,
});

function Home() {
	return (
		<PageContainer className="flex-row">
			<Section className="max-h-dvh min-h-dvh w-160 bg-black/20" />
			<Section className="max-h-dvh min-h-dvh">
				<div className="flex flex-col items-center gap-3">
					<h3 className="font-serif text-3xl">Log in to Keylabs</h3>
					<Text>Connect to Keylabs with:</Text>
				</div>
				<SocialLoginButtons />
			</Section>
		</PageContainer>
	);
}
