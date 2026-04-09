import type { MetadataRoute } from "next";
import { baseURL } from "@/lib/utils";

export default function robots(): MetadataRoute.Robots {
	return {
		rules: { userAgent: "*", allow: "/" },
		sitemap: `https://${baseURL}sitemap.xml`,
	};
}
