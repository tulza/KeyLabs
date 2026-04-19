"use server";

import { readFile } from "fs/promises";
import path from "path";

const themeDir = path.join(process.cwd(), "src/data/themes");

const themeModules: Record<string, () => Promise<string>> = {
	default: () => readFile(path.join(themeDir, "default.css"), "utf-8"),
	cookiecat: () => readFile(path.join(themeDir, "cookiecat.css"), "utf-8"),
	matcha: () => readFile(path.join(themeDir, "matcha.css"), "utf-8"),
};

const normalizeEnding = (str: string) => str.replace(/\r\n/g, "\n");

export const getThemeStyle = async (name: string) => {
	const loader = themeModules[name] ?? themeModules.default;
	return normalizeEnding(await loader());
};
