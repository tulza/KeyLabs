import { useEffect } from "react";
import { Route } from "@/app";
import { useAuthStore } from "@/lib/game/store/auth";

export const AuthSync = () => {
	const { user } = Route.useRouteContext();

	useEffect(() => {
		useAuthStore.getState().setUser(user);
	}, [user]);

	return null;
};
