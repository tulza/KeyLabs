import { Metadata } from "next";

export const baseMetadata: Metadata = {
	title: {
		default: "Keylabs",
		template: "%s | Keylabs",
	},
	description: "A competitive aim-to-type game!",
	metadataBase: new URL("https://keylabs.fly.dev/"),
	openGraph: {
		title: "Keylabs",
		url: new URL("https://keylabs.fly.dev/"),
		images: [{ url: "/og-image.png" }],
		siteName: "Keylabs",
		type: "website",
	},
	twitter: {
		card: "summary_large_image",
		title: "Keylabs",
		description: "A competitive aim-to-type game!",
		images: ["/og-image.png"],
	},
};
