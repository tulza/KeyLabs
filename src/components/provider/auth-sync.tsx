import { useRouterState } from "@tanstack/react-router";
import { useEffect } from "react";
import { useAuthStore } from "@/lib/game/store/auth";

function AuthSyncInner() {
	const user = useRouterState({
		select: (s) =>
			s.matches.find((m) => m.routeId === "__root__")?.context?.user,
	});

	useEffect(() => {
		useAuthStore.getState().setUser(user);
	}, [user]);

	return null;
}

export const AuthSync = () => {
	if (typeof window === "undefined") return null;
	return <AuthSyncInner />;
};
