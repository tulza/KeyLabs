import { cookies } from "next/headers";

export async function getThemeCookie() {
	const cookieStore = await cookies();
	return cookieStore.get("theme")?.value ?? "default";
}
