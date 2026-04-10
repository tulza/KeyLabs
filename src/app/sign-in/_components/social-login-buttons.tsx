"use client";

import { useState } from "react";
import { GitHubIcon, GoogleIcon, LoadingIcon } from "@/components/icon";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";

type Provider = "github" | "google";

const providers: { id: Provider; label: string; icon: React.ReactNode }[] = [
	{ id: "github", label: "Continue with GitHub", icon: <GitHubIcon /> },
	{ id: "google", label: "Continue with Google", icon: <GoogleIcon /> },
];

export const SocialLoginButtons = () => {
	const [loading, setLoading] = useState<Provider | null>(null);

	const handleSignIn = async (provider: Provider) => {
		setLoading(provider);
		await authClient.signIn.social({ provider });
	};

	return (
		<div className="flex w-full flex-col gap-3">
			{providers.map(({ id, label, icon }) => (
				<Button
					key={id}
					variant="outline"
					className="relative w-full gap-2"
					onClick={() => handleSignIn(id)}
					disabled={loading !== null}
				>
					{loading === id && (
						<LoadingIcon className="absolute right-2 size-4 animate-spin *:stroke-foreground" />
					)}
					{icon}
					{label}
				</Button>
			))}
		</div>
	);
};
