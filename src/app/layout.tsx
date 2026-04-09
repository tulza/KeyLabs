import "./globals.css";

import type { Metadata } from "next";
import type { PropsWithChildren } from "react";
import { fontLoader } from "@/lib/fontLoader";
import { loadedFonts } from "@/lib/fonts";
import { baseMetadata } from "@/lib/meta";
import { AppProvider } from "./_frontend/provider";

export const metadata: Metadata = baseMetadata;

export default function RootLayout({ children }: PropsWithChildren) {
	return (
		<html lang="en">
			<body
				className={`${fontLoader(loadedFonts)} min-h-dvh antialiased`}
			>
				<AppProvider>{children}</AppProvider>
			</body>
		</html>
	);
}
