const modules = import.meta.glob("./*.css", {
	eager: false,
	query: "?raw",
	import: "default",
});

const getFileName = (path: string) => {
	return path.split("/").pop()?.replace(".css", "");
};

const normalizeEnding = (str: string) => str.replace(/\r\n/g, "\n");

export const themeModules: Record<string, () => Promise<string>> =
	Object.fromEntries(
		Object.entries(modules).map(([path, loader]) => [
			getFileName(path),
			loader,
		]),
	);

export const getThemeStyle = async (name: string): Promise<string> => {
	const loader = themeModules[name] ?? themeModules["default"];

	const css = await loader();

	return normalizeEnding(css);
};
