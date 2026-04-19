import Image from "next/image";
import { img } from "@/assets";
import { PageContainer } from "@/components/container/PageContainer";
import { Section } from "@/components/container/section";
import { Text } from "@/components/typography/text";
import { BackHomeButton } from "./_components/home-button";
import { SocialLoginButtons } from "./_components/social-login-buttons";

export default function SignInPage() {
	return (
		<PageContainer className="flex-row">
			<div className="relative flex max-h-dvh min-h-dvh min-w-85 max-w-85 items-center justify-center border-secondary border-r bg-background px-6">
				<Image
					className="pointer-events-none absolute top-0 left-0 size-full object-contain object-top"
					src={img.background}
					alt="background"
					height={400}
				/>
				<Image
					className="pointer-events-none absolute bottom-0 left-0 z-10 size-full object-contain object-bottom [@media(max-height:700px)]:hidden"
					src={img.game}
					alt="game"
					height={400}
				/>

				<div className="z-20 flex flex-col items-center gap-6">
					<Image
						className="pointer-events-none"
						src={img.keylabs}
						alt="keylabs"
						width={187}
						height={44}
					/>
					<Text className="text-center font-serif text-2xl italic">
						Play the web’s Least conventional typing test
					</Text>
				</div>
			</div>
			<Section className="relative flex max-h-dvh min-h-dvh items-center justify-center">
				<div className="absolute top-6 left-6">
					<BackHomeButton />
				</div>
				<div className="flex flex-col items-center gap-12">
					<div className="flex flex-col items-center gap-3">
						<h3 className="font-serif text-3xl text-icon">
							Log in to Keylabs
						</h3>
						<Text>Connect to Keylabs with:</Text>
					</div>
					<div className="relative flex w-full flex-col items-center gap-6">
						<SocialLoginButtons />
						<hr className="w-full" />
						<Text
							size="small"
							className="underline decoration-dotted"
						>
							terms and policy
						</Text>
					</div>
				</div>
			</Section>
		</PageContainer>
	);
}
