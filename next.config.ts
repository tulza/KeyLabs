import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	typescript: {
		// !! WARN !!
		// Dangerously allow production builds to successfully complete even if
		// your project has type errors.
		// !! WARN !!
		ignoreBuildErrors: true,
	},
	rewrites: async () => {
		return [
			{
				source: "/((?!api(?:/|$)).*)",
				destination: "/static-app-shell",
			},
		];
	},
	turbopack: {
		rules: {
			"*.frag": {
				loaders: ["raw-loader", "glslify", "glslify-loader"],
				as: "*.js",
			},
			"*.vert": {
				loaders: ["raw-loader", "glslify", "glslify-loader"],
				as: "*.js",
			},
		},
	},
	webpack: (config) => {
		config.module.rules.push({
			test: /\.(glsl|vs|fs|vert|frag)$/,
			use: ["raw-loader", "glslify", "glslify-loader"],
		});
		return config;
	},
	allowedDevOrigins: ["*.ngrok-free.app", "*.trycloudflare.com"],
};

export default nextConfig;
