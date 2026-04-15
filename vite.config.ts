// vite.config.ts

import tailwindcss from "@tailwindcss/vite";
import { devtools } from "@tanstack/devtools-vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import { nitro } from "nitro/vite";
import { defineConfig } from "vite";

export default defineConfig({
	build: {
		// Ensure consistent asset naming between client and SSR builds
		// https://github.com/TanStack/router/issues/4959
		cssCodeSplit: false,
		rollupOptions: {
			output: {
				// Use fixed CSS filename without hash to prevent client/SSR mismatch
				assetFileNames: (assetInfo) => {
					if (assetInfo.name?.endsWith(".css")) {
						return "assets/styles.[ext]";
					}
					return "assets/[name]-[hash].[ext]";
				},
			},
		},
	},
	server: {
		port: 4000,
	},
	resolve: {
		tsconfigPaths: true,
	},
	plugins: [
		devtools(),
		tailwindcss(),
		tanstackStart({
			srcDirectory: "src", // This is the default
			router: {
				// Specifies the directory TanStack Router uses for your routes.
				routesDirectory: "app", // Defaults to "routes", relative to srcDirectory
				routeFileIgnorePattern: "(_components|_services|_configs)",
			},
		}),
		viteReact(),
		nitro({
			preset: "node",
		}),
	],
});
