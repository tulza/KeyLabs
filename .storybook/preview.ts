import type { Preview } from "@storybook/nextjs-vite";
import { spyOn } from "storybook/test";

import "../src/app/globals.css";
import "./preview.css";

export const beforeEach = () => {
	spyOn(console, "log").mockName("console.log");
	spyOn(console, "warn").mockName("console.warn");
};

const preview: Preview = {
	parameters: {
		layout: "fullscreen",
		controls: {
			matchers: {
				color: /(background|color)$/i,
				date: /Date$/i,
			},
		},
	},
};

export default preview;
