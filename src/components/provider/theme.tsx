import { FC, useEffect } from "react";
import { themeSets } from "@/data/themes/themes";
import { useTheme } from "@/lib/game/store/theme";

export const ThemeHead: FC<{ forceTheme?: string }> = ({ forceTheme }) => {
	const { theme } = useTheme();
	const themeName = forceTheme ?? theme;

	useEffect(() => {
		const el =
			document.getElementById("theme-style") ??
			document.createElement("style");
		el.id = "theme-style";
		el.textContent = themeSets[themeName] ?? themeSets["default"];
		if (!el.parentNode) document.head.appendChild(el);
	}, [themeName]);

	return null;
};
