export function getThemeFromCookie(cookieHeader?: string): string {
	if (!cookieHeader) return "default";
	const match = cookieHeader.match(/(?:^|;\s*)theme=([^;]+)/);
	return match?.[1] ?? "default";
}
