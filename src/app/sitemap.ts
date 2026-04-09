import type { MetadataRoute } from "next";
import { baseURL } from "@/lib/utils";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
	return [
		{
			url: baseURL,
			lastModified: new Date(),
			changeFrequency: "monthly",
			priority: 1,
		},
	];
}
