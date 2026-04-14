import Cookies from "js-cookie";
import { create } from "zustand";

export type ThemeType = {
	theme: string;
	handleSetTheme: (theme: string) => void;
};

const getInitialTheme = () => {
	if (typeof window === "undefined") return "default";
	return Cookies.get("theme") ?? localStorage.getItem("theme") ?? "default";
};

export const useTheme = create<ThemeType>()((set) => ({
	theme: getInitialTheme(),
	handleSetTheme: (theme: string) => {
		Cookies.set("theme", theme, {
			path: "/",
			expires: 365,
			sameSite: "lax",
		});
		set({ theme });
	},
}));
