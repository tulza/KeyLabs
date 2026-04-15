import Cookies from "js-cookie";
import { create } from "zustand";

export type ThemeType = {
	theme: string;
	initialized: boolean;
	handleSetTheme: (theme: string) => void;
};

const getInitialTheme = () => {
	if (typeof window === "undefined") return "default";
	return Cookies.get("theme") ?? "default";
};

export const useTheme = create<ThemeType>()((set) => ({
	theme: getInitialTheme(),
	initialized: false,
	handleSetTheme: (theme: string) => {
		Cookies.set("theme", theme, {
			path: "/",
			expires: 365,
			sameSite: "lax",
		});
		set({ theme, initialized: true });
	},
}));
