import { Metadata } from "next";

export const baseMetadata: Metadata = {
	title: {
		default: "Chromic Lab",
		template: "%s | Chromic Lab",
	},
	description: "Website to learn more about color",
	openGraph: {
		title: "Chromic Lab",
		images: [{ url: "/og-image.png" }],
		type: "website",
	},
	twitter: {
		card: "summary_large_image",
		title: "Chromic Lab",
		description: "Website to learn more about color",
		images: ["/og-image.png"],
	},
};
