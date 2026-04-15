import abeezeeCss from "@fontsource/abeezee/400-italic.css?url";
import inclusiveSansCss from "@fontsource-variable/inclusive-sans/wght.css?url";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
	createRootRoute,
	HeadContent,
	Link,
	Outlet,
	Scripts,
} from "@tanstack/react-router";
import { NuqsAdapter } from "nuqs/adapters/react";
import { LeftArrowIcon } from "@/components/icon";
import { ThemeHead } from "@/components/provider/theme";
import { Button } from "@/components/ui/button";
import { getThemeStyle } from "@/data/themes/themes";
import { getThemeCookie } from "@/lib/cookie/theme-server";
import appCss from "../styles/globals.css?url";

const queryClient = new QueryClient();

export const Route = createRootRoute({
	loader: async () => {
		const theme = await getThemeCookie();
		const ThemeStyles = await getThemeStyle(theme);

		return { theme, ThemeStyles };
	},
	head: ({ loaderData }) => {
		const { ThemeStyles } = loaderData as { ThemeStyles: string };

		return {
			styles: [
				{
					id: "theme-style",
					children: ThemeStyles ?? "",
				},
			],
			meta: [
				{ charSet: "utf-8" },
				{
					name: "viewport",
					content: "width=device-width, initial-scale=1",
				},
				{ title: "Keylabs" },
			],
			links: [
				{ rel: "stylesheet", href: appCss },
				{ rel: "stylesheet", href: abeezeeCss },
				{ rel: "stylesheet", href: inclusiveSansCss },
				{ rel: "icon", href: "/icon.png", type: "image/x-icon" },
			],
		};
	},
	component: RootLayout,
	notFoundComponent: NotFound,
});

function NotFound() {
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
					<Link to="/">
						<LeftArrowIcon className="size-5 *:stroke-foreground" />
						<span>Go Back</span>
					</Link>
				</Button>
			</div>
		</div>
	);
}

function RootLayout() {
	const { theme } = Route.useLoaderData();
	return (
		<NuqsAdapter>
			<QueryClientProvider client={queryClient}>
				<html lang="en" suppressHydrationWarning>
					<head>
						<HeadContent />
					</head>
					<body className="min-h-dvh antialiased">
						<ThemeHead />
						<Outlet />
						<Scripts />
					</body>
				</html>
			</QueryClientProvider>
		</NuqsAdapter>
	);
}
