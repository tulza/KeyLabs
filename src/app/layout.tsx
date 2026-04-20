import "../styles/globals.css";

import type { Metadata } from "next";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import { AuthSync } from "@/components/provider/auth-sync";
import { QueryProvider } from "@/components/provider/query";
import { ThemeHead } from "@/components/provider/theme";
import { getThemeStyle } from "@/data/themes/themes";
import { getSession } from "@/lib/auth.functions";
import { getThemeCookie } from "@/lib/cookie/theme-server";
import { FontsRecord } from "@/lib/fontLoader";
import { cn } from "@/lib/utils";
import { fontLoader } from "@/lib/utils/fontLoader";
import { _ABCDiaType, _ABeeZee, _InclusiveSans } from "@/styles/fonts";
import { baseMetadata } from "@/lib/meta";

export const metadata: Metadata = baseMetadata;

const loadedFonts: FontsRecord = {
	variables: [_InclusiveSans, _ABeeZee],
	classNames: [_ABCDiaType],
} as const;

export default async function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const theme = await getThemeCookie();
	const ThemeStyles = await getThemeStyle(theme);
	const session = await getSession();
	const user = session?.user;

	return (
		<html lang="en">
			<head>
				{ThemeStyles && <style id="theme-style">{ThemeStyles}</style>}
			</head>
			<body
				className={cn(fontLoader(loadedFonts), "min-h-dvh antialiased")}
			>
				<ThemeHead />
				<QueryProvider>
					<NuqsAdapter>
						{children}
						<AuthSync user={user} />
					</NuqsAdapter>
				</QueryProvider>
			</body>
		</html>
	);
}
