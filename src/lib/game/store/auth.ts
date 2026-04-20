import { User } from "better-auth";
import { create } from "zustand";

// a client side user object that is passed down by the server through AuthSync.
type AuthStore = {
	user?: User;
	setUser: (user?: User) => void;
	clearUser: () => void;
};

export const useAuthStore = create<AuthStore>((set) => ({
	user: undefined,
	setUser: (user) => set({ user }),
	clearUser: () => set({ user: undefined }),
}));

export const useUser = () => useAuthStore((s) => s.user);
export const getUser = () => useAuthStore.getState().user;
