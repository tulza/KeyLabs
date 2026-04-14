const modules = import.meta.glob<string>("./*.css", {
	eager: true,
	query: "?raw",
	import: "default",
});

export const themeSets = Object.fromEntries(
	Object.entries(modules).map(([path, module]) => {
		const name = path.match(/\/(\w+)\.css$/)?.[1];
		return [name, module.replace(/\r\n/g, "\n")];
	}),
) as Record<string, string>;

export const getTheme = (setName: string): string => {
	return themeSets[setName] ?? themeSets["default"];
};
