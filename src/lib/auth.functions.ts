"use server";

import { headers } from "next/headers";
import { auth } from "@/lib/auth";

export const getSession = async () => {
	const _headers = await headers();
	const session = await auth.api.getSession({ headers: _headers });

	return session;
};

export const ensureSession = async () => {
	const _headers = await headers();

	const session = await auth.api.getSession({ headers: _headers });

	if (!session) {
		throw new Error("Unauthorized");
	}

	return session;
};
