export type PreviewTheme = {
	background: string;
	color1: string;
	color2: string;
	color3: string;
};

export type Preview = {
	name: string;
	id: string;
	preview: PreviewTheme;
};

export const themePreview: Preview[] = [
	{
		name: "default",
		id: "default",
		preview: {
			background: "#f6f4e7",
			color1: "#453d3d",
			color2: "#cbc1b4",
			color3: "#000000",
		},
	},
	{
		name: "Cookie Cat",
		id: "cookiecat",
		preview: {
			background: "#262836",
			color1: "#f5b7e4",
			color2: "#ca9bee",
			color3: "#3e2e40",
		},
	},
	{
		name: "Matcha",
		id: "matcha",
		preview: {
			background: "#1e2420",
			color1: "#7ab648",
			color2: "#a8c97f",
			color3: "#2d3d28",
		},
	},
];
