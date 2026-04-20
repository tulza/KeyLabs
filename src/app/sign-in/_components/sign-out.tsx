"use client";

import { HTMLAttributes, useState } from "react";
import { LoadingIcon } from "@/components/icon";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import { cn } from "@/lib/utils";

export const SignOutButton = (props: HTMLAttributes<HTMLButtonElement>) => {
	const [loading, setLoading] = useState(false);

	const handleSignOut = async () => {
		setLoading(true);
		await authClient.signOut();
	};

	return (
		<Button
			{...props}
			variant="outline"
			className={cn("relative", props.className)}
			onClick={handleSignOut}
			disabled={loading}
		>
			{loading && (
				<LoadingIcon className="absolute right-2 size-4 animate-spin *:stroke-foreground" />
			)}
			Sign out
		</Button>
	);
};
