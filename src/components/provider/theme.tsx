"use client";

import { FC, useEffect } from "react";
import { getThemeStyle } from "@/data/themes/themes";
import { useTheme } from "@/lib/game/store/theme";

export const ThemeHead: FC<{ forceTheme?: string }> = ({ forceTheme }) => {
	const { theme, initialized, handleSetTheme } = useTheme();
	const themeName = forceTheme ?? theme;

	useEffect(() => {
		if (themeName && !initialized) {
			handleSetTheme(themeName);
		}
	}, [themeName, initialized, handleSetTheme]);

	useEffect(() => {
		if (!themeName) return;
		const updateTheme = async () => {
			const css = await getThemeStyle(themeName);
			if (!css) return;

			const el =
				document.querySelector<HTMLStyleElement>(
					"#theme-style-client",
				) ?? document.createElement("style");
			el.id = "theme-style";
			el.textContent = css;
			if (!el.isConnected) {
				document.head.appendChild(el);
			}
		};
		updateTheme();
	}, [themeName]);

	return null;
};
