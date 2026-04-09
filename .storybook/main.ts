import type { StorybookConfig } from "@storybook/nextjs-vite";
import glsl from "vite-plugin-glsl";

const config: StorybookConfig = {
	stories: [
		"../src/**/*.stories.@(js|jsx|mjs|ts|tsx)",
		"../src/libs/stories/**/*.mdx",
	],
	addons: ["@storybook/addon-docs"],
	framework: "@storybook/nextjs-vite",
	viteFinal: async (config) => {
		config.plugins = config.plugins || [];
		config.plugins.push(
			glsl({
				include: [
					"**/*.glsl",
					"**/*.vs",
					"**/*.fs",
					"**/*.vert",
					"**/*.frag",
				],
			}),
		);
		return config;
	},
};
export default config;
