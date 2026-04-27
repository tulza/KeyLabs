import { getSessionCookie } from "better-auth/cookies";
import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/auth.functions";
import { AccountStatus } from "@/lib/game/enum";

export async function proxy(request: NextRequest) {
	const { pathname } = request.nextUrl;

	const sessionCookie = getSessionCookie(request);

	if (pathname.startsWith("/profile")) {
		if (!sessionCookie) {
			return NextResponse.redirect(new URL("/sign-in", request.url));
		}
	}

	// logger(sessionCookie, "proxy-session-cookie");

	const { user } = (await getSession()) || {};
	const { status } = user || {};

	// logger({ status, user }, "proxy-status-user");

	if (
		status === AccountStatus.HANDLE_PENDING &&
		!pathname.startsWith("/choose-handle")
	) {
		return NextResponse.redirect(new URL("/choose-handle", request.url));
	}

	return NextResponse.next();
}

export const config = {
	matcher: [
		/*
		 * Match all request paths except for the ones starting with:
		 * - api (API routes)
		 * - _next/static (static files)
		 * - _next/image (image optimization files)
		 * - favicon.ico (favicon file)
		 */
		"/((?!api|_next/static|_next/image|favicon.ico).*)",
	],
};
