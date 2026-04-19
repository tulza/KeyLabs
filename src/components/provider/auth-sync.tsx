"use client";

import { User } from "better-auth";
import { useEffect } from "react";
import { useAuthStore } from "@/lib/game/store/auth";

export const AuthSync = ({ user }: { user?: User }) => {
	useEffect(() => {
		useAuthStore.getState().setUser(user);
	}, [user]);

	return null;
};
