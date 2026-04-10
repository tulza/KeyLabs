import { Metadata } from "next";

export const baseMetadata: Metadata = {
	title: {
		default: "Keylabs",
		template: "%s | Keylabs",
	},
	description: "Website to learn more about color",
	openGraph: {
		title: "Keylabs",
		images: [{ url: "/og-image.png" }],
		type: "website",
	},
	twitter: {
		card: "summary_large_image",
		title: "Keylabs",
		description: "Website to learn more about color",
		images: ["/og-image.png"],
	},
};
