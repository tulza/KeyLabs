import "../styles/globals.css";

import type { Metadata } from "next";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import { AuthSync } from "@/components/provider/auth-sync";
import { QueryProvider } from "@/components/provider/query";
import { ThemeHead } from "@/components/provider/theme";
import { getThemeStyle } from "@/data/themes/themes";
import { getSession } from "@/lib/auth.functions";
import { getThemeCookie } from "@/lib/cookie/theme-server";
import { FontsRecord, fontLoader } from "@/lib/fontLoader";
import { baseMetadata } from "@/lib/meta";
import { cn } from "@/lib/utils";
import {
	_ABCDiaType,
	_ABeeZee,
	_Helvetica,
	_InclusiveSans,
} from "@/styles/fonts";

export const metadata: Metadata = baseMetadata;

const loadedFonts: FontsRecord = {
	variables: [_InclusiveSans, _ABeeZee, _Helvetica],
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
